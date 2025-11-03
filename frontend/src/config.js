// API Configuration
// In production (Railway), frontend and backend are served from the same domain
// So we use an empty string to make relative API calls
// In development, we use localhost:5000
export const API_URL = process.env.NODE_ENV === 'production'
  ? ''
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

// Export base URL for axios instances
export default API_URL;