import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const BUSINESS_TYPES = [
  'Restaurant / Café',
  'Art / Creative Studio',
  'Boutique / Apparels',
  'Retail Store / E-commerce',
  'Salon / Spa / Wellness',
  'Hotel / Hospitality',
  'Healthcare / Clinic',
  'Fitness / Gym',
  'Professional Services',
  'Education / Training',
  'Other',
]