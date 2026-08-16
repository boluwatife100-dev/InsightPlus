// ============================================================
// Service registry — the ONLY place pages import from.
//
// Pages and components must never import the API client directly;
// they import services from here. The app now targets the real
// backend routes only.
//
// The backend developer implements the endpoints documented in
// src/services/*.js — no component code needs to change.
// ============================================================

import * as authService from './authService.js'
import * as businessService from './businessService.js'
import * as dashboardService from './dashboardService.js'
import * as aiInsightsService from './aiInsightsService.js'
import * as feedbackService from './feedbackService.js'

export { authService, businessService, dashboardService, aiInsightsService, feedbackService }
