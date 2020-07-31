import { getAllGallery } from '../../utils/fetch';
import { LOADING, SUCCESS, FAILED } from './constants';

export const fetchAllGallery = () => {
  return (dispatch) => {
    const key = 'Gallery';
    dispatch(loadingAction(true, key));

    getAllGallery()
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
