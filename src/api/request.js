import axios from 'axios';

const service = axios.create({
  'timeout': 50000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error, 'error debug');
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
