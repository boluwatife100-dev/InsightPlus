const { GoogleGenerativeAI } = require("@google/generative-ai");

let aiInstance = null;
const getGenAI = () => {
  if (!aiInstance && process.env.GEMINI_API_KEY) {
    aiInstance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return aiInstance;
};

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

const generateInsight = async (feedbackData, businessType = 'General business') => {
  const ai = getGenAI();
  if (!ai) {
    console.warn("GEMINI_API_KEY is not set. Returning fallback data.");
    return null;
  }

  const model = ai.getGenerativeModel({
    model: "gemini-3.6-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const totalFeedbackCount = feedbackData.length;

  const prompt = `You are a top-tier business growth expert and consultant, specialized in advising businesses in the "${businessType}" industry. You deeply understand how ${businessType} businesses operate, scale, and how their customers think and behave.

I will provide you with collated customer feedback data for a ${businessType} business. The total number of feedback items provided in this batch is ${totalFeedbackCount}.

CRITICAL RULES — read before writing anything:
- Base every claim strictly on the feedback data provided below. Never invent, assume, or extrapolate issues, praise, or numbers that aren't actually reflected in the data.
- If the feedback is overwhelmingly positive and contains no meaningful complaints, do NOT manufacture friction points to fill a quota. It is correct and expected to return an empty "frictionPoints" array in that case.
- Only include a friction point if at least one piece of feedback actually describes that problem. Never pad the list to reach a minimum count.
- "pct" and "count" must be your best-effort estimate grounded in how many of the ${totalFeedbackCount} items actually mention that issue — never a placeholder or invented number.
- If there is too little data to say anything meaningful (e.g. fewer than 3 feedback items), say so plainly in "aiSummary.text" rather than overreaching.

Based on this data, your task is to output a JSON object with the following keys:
1. "aiSummary": {
      "text": "A concise, encouraging, and insightful 2-3 sentence overview of the current state of the business based on the feedback, written with ${businessType} context in mind.",
      "highlights": ["1 to 3 short string phrases that appear exactly within your text. These will be bolded in the UI."]
   }
2. "recommendedAction": {
      "text": "One practical, specific, and actionable recommendation tailored to a ${businessType} business, directly tied to something in the feedback data. If feedback is entirely positive, recommend a way to reinforce or capitalize on what's working, rather than inventing a fix for a nonexistent problem."
   }
3. "frictionPoints": [
      { 
        "label": "Issue name (e.g., Slow delivery)", 
        "pct": percentage as integer (0-100),
        "count": estimated count of occurrences as an integer (based on the provided total ${totalFeedbackCount})
      }
   ] (List only genuine, data-supported friction points, up to 5. Return an empty array if none exist — do not force a minimum.)

Here is the data:
${JSON.stringify(feedbackData.slice(0, 50))} // Sending up to 50 feedback items to avoid token limits

Return ONLY valid JSON with no additional formatting or code blocks.`;

for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    const isLastAttempt = attempt === MAX_RETRIES;
    console.error(`Gemini AI error (attempt ${attempt}/${MAX_RETRIES}):`, error.message);

    if (isLastAttempt) {
      return null; // let the controller decide the fallback response
    }

    // Exponential backoff: 1s, 2s, 4s
    const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
};

module.exports = { generateInsight };