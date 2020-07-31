import { getAllAlbum, getDetailAlbum, getGalleryAlbum } from '../../utils/fetch';
import { LOADING, SUCCESS, FAILED } from './constants';

export const fetchAllAlbum = () => {
  return (dispatch) => {
    const key = 'Album';
    dispatch(loadingAction(true, key));

    getAllAlbum()
      .then((data) => {
        dispatch(successAction(data.data.albums, key));
      })
      .catch((err) => {
        dispatch(failedAction('Error when fetch data', key));
      });
  };
};

export const fetchDetailAlbum = (id) => {
  return (dispatch) => {
    const key = 'Detail';
    dispatch(loadingAction(true, key));

    getDetailAlbum(id)
      .then((data) => {
        dispatch(successAction(data.data, key));
      })
      .catch((err) => {
        dispatch(failedAction('Error when fetch data', key));
      });
  };
};

export const fetchAlbumGallery = (id) => {
  return (dispatch) => {
    const key = 'AlbumGallery';
    dispatch(loadingAction(true, key));

    getGalleryAlbum(id)
      .then((data) => {
        dispatch(successAction(data.data.gallery, key));
      })
      .catch((err) => {
        dispatch(failedAction('Error when fetch data', key));
      });
  };
};

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function successAction(data, key) {
  return { type: SUCCESS, data, key };
}
