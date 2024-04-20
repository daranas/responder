import axiosOriginal from 'axios';
const axios = axiosOriginal.create();

axios.interceptors.request.use(
  function (config) {
    config.headers['Access-Control-Allow-Credentials'] = true;
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axios;
