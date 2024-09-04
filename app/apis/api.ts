import axios from 'axios';
import URLs from '../config/urls';

const api = axios.create({
  baseURL: URLs.base,
  headers: {
    Accept: 'application/json',
  },
});
// api.interceptors.request.use(request => {
//   console.log(
//     '↓',
//     '\n',
//     'Request URL ====>',
//     URLs.base + request.url,
//     '\n',
//     '\n',
//     'Request Method ====>',
//     request.method,
//     '\n',
//     '\n',
//     'Request Data ====>',
//     request.data,
//     '\n',
//     '\n',
//     'Request Headers ====>',
//     request.headers,
//     '\n',
//     '↑',
//   );
//   return request;
// });

api.interceptors.response.use(
  response => {
    console.log(
      response.config.url,
      'api response =>',
      // JSON.stringify(response?.data?.body, null, 2),
      response?.data,
    );
    if (response?.data != null && response?.data?.success === true) {
      return response;
    } else {
      let message = response?.data?.message ?? 'Unknown error';
      if (typeof message !== 'string') {
        message = response?.data?.error_description ?? message?.toString();
      }
      toast.show(message, {type: 'warning', duration: 3000});

      throw response?.data;
    }
  },
  error => {
    console.log(
      '🚀 ~ error: url=>',
      error.response.config.url,
      '===> error ====>',
      JSON.stringify(error?.response?.data, null, 2),
    );
    let message = error.response?.data?.message ?? error?.message;
    toast.show(message, {type: 'danger'});
    throw {
      message: message,
      status: 'failed',
      status_code: error.response?.status ?? 500,
    };
  },
);

export default api;
