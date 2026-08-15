const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;

const getGenAI = () => {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

const generateInsight = async (feedbackData) => {
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

  const prompt = `You are a top-tier business growth expert and consultant. You deeply understand how businesses scale, how to optimize operations, and how clients think and behave.

I will provide you with collated customer feedback data. The total number of feedback items provided in this batch is ${totalFeedbackCount}.

Based on this data, your task is to output a JSON object with the following keys:
1. "aiSummary": {
      "text": "A concise, encouraging, and insightful 2-3 sentence overview of the current state of the business based on the feedback.",
      "highlights": ["1 to 3 short string phrases that appear exactly within your text. These will be bolded in the UI."]
   }
2. "recommendedAction": {
      "text": "A practical, actionable, and specific recommendation the business owner should take right now to improve their services or customer experience."
   }
3. "frictionPoints": [
      { 
        "label": "Issue name (e.g., Slow delivery)", 
        "pct": percentage as integer (0-100),
        "count": estimated count of occurrences as an integer (based on the provided total ${totalFeedbackCount})
      }
   ] (Provide top 3 to 5 friction points based on the feedback)

Here is the data:
${JSON.stringify(feedbackData.slice(0, 50))} // Sending up to 50 feedback items to avoid token limits

Return ONLY valid JSON with no additional formatting or code blocks.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI error:", error);
    return null;
  }
};

module.exports = { generateInsight };
