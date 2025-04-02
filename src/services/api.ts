
import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API requests and responses
export interface PlanetaryPosition {
  planet: string;
  house: number;
}

export interface PredictionRequest {
  planetary_positions: PlanetaryPosition[];
}

export interface Prediction {
  prediction: string;
  probability: number;
}

export interface PredictionResponse {
  predictions: Prediction[];
}

export interface ExplainRequest {
  prediction: string;
}

export interface ExplainResponse {
  explanation: string;
}

export interface FeedbackRequest {
  prediction: string;
  feedback: string;
  rating: number;
}

export interface FeedbackResponse {
  status: string;
  message: string;
}

export interface TransitResponse {
  current_transits: {
    planet: string;
    position: {
      sign: string;
      house: number;
    };
  }[];
}

// API service methods
const ApiService = {
  // Get predictions based on planetary positions
  getPredictions: async (data: PredictionRequest): Promise<PredictionResponse> => {
    const response = await api.post('/predict', data);
    return response.data;
  },

  // Get explanation for a prediction
  getExplanation: async (data: ExplainRequest): Promise<ExplainResponse> => {
    const response = await api.post('/explain', data);
    return response.data;
  },

  // Submit user feedback
  submitFeedback: async (data: FeedbackRequest): Promise<FeedbackResponse> => {
    const response = await api.post('/feedback', data);
    return response.data;
  },

  // Get current planetary transits
  getCurrentTransits: async (): Promise<TransitResponse> => {
    const response = await api.get('/current_transit');
    return response.data;
  },

  // Admin: Trigger model retraining
  retrain: async (): Promise<{ status: string }> => {
    const response = await api.post('/retrain');
    return response.data;
  },

  // Get all feedback (admin)
  getAllFeedback: async (): Promise<any[]> => {
    const response = await api.get('/all_feedback');
    return response.data;
  }
};

export default ApiService;
