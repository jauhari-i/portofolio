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

export const getAllGallery = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/gallery`, { headers: BASIC_AUTH })
      .then((data) => {
        resolve(data.data);
      })
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

export const getAllAlbum = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/album`, { headers: BASIC_AUTH })
      .then((data) => {
        resolve(data.data);
      })
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

export const getDetailAlbum = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/album/${id}`, { headers: BASIC_AUTH })
      .then((data) => {
        resolve(data.data);
      })
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

export const getGalleryAlbum = async (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/gallery/album/${id}`, { headers: BASIC_AUTH })
      .then((data) => {
        resolve(data.data);
      })
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
