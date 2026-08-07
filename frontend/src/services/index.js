// ============================================================
// Service registry — the ONLY place pages import from.
//
// Pages and components must never import mock data or the API
// client directly; they import services from here. Switching
// between the bundled demo data and the real backend is a single
// env var: VITE_USE_MOCK=false (see src/config.js and .env.example).
//
// The backend developer implements the endpoints documented in
// src/services/*.js — no component code needs to change.
// ============================================================

import { config } from '../config.js'

import * as authServiceApi from './authService.js'
import * as authServiceMock from './mock/authService.js'
import * as businessServiceApi from './businessService.js'
import * as businessServiceMock from './mock/businessService.js'
import * as dashboardServiceApi from './dashboardService.js'
import * as dashboardServiceMock from './mock/dashboardService.js'
import * as aiInsightsServiceApi from './aiInsightsService.js'
import * as aiInsightsServiceMock from './mock/aiInsightsService.js'
import * as feedbackServiceApi from './feedbackService.js'
import * as feedbackServiceMock from './mock/feedbackService.js'

const pick = (useMock, real, mock) => (useMock ? mock : real)
const useMock = config.useMock

export const authService = pick(useMock, authServiceApi, authServiceMock)
export const businessService = pick(useMock, businessServiceApi, businessServiceMock)
export const dashboardService = pick(useMock, dashboardServiceApi, dashboardServiceMock)
export const aiInsightsService = pick(useMock, aiInsightsServiceApi, aiInsightsServiceMock)
export const feedbackService = pick(useMock, feedbackServiceApi, feedbackServiceMock)