import axios from 'axios';

// const getToken = () => {
//   const token = localStorage.getItem('galleryauth');
//   return token;
// };

const baseUrl = 'https://gallery-heni.herokuapp.com/api/v1';

const BASIC_AUTH = {
  Authorization: 'Basic Z2FsbGVyeTpnYWxsZXJ5MjAyMA==',
};
// const BEARER_AUTH = { Authorization: getToken() };

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => resolve(res))
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };
        if (!err.response) reject(defaultError);
        else if (!err.response.data) reject(defaultError);
        else reject(err.response.data);
      });
  });
};

export const getAllGallery = async () => {
  await fetch(`${baseUrl}/gallery`, 'get', { BASIC_AUTH });
};
