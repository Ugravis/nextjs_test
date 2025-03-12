import PROJECTCONFIG from './project.config.json'
import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV==='development'?PROJECTCONFIG.DEV.apiBaseURL:PROJECTCONFIG.PROD.apiBaseURL,
    // headers: { 'Content-Type': 'application/json' },
    timeout: 10*1000,
})

// apiClient.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       // Gestion des erreurs (401, 403, etc.)
//       if (error.response?.status === 401) {
//         // Redirection vers la page de connexion ou rafraîchissement du token
//       }
//       return Promise.reject(error);
//     }
//   );