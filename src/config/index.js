const env = process.env.NODE_ENV || 'development';
const mode = {
  development: {
    apiUrl: 'http://127.0.0.1:8000/',
    baseUrl: 'http://127.0.0.1:8000/',
  },
  staging: {
    apiUrl: 'http://127.0.0.1:8000/',
    baseUrl: 'http://127.0.0.1:8000/',
  },
  production: {
    apiUrl: 'http://127.0.0.1:8000/',
    baseUrl: 'http://127.0.0.1:8000/',
  },
};

export default mode[env];
