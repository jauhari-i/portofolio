import { LOADING, FAILED, SUCCESS } from './constant';
import { getUserAbout, sendContactMe } from '../../utils/fetch';

export const fetchAbout = () => {
  return (dispatch) => {
    const key = 'About';
    dispatch(loadingAction(true, key));

    getUserAbout()
      .then((data) => {
        dispatch(successAction(data.data.about[0], key));
      })
      .catch((err) => {
        dispatch(failedAction('Error when fetch data', key));
      });
  };
};

export const sendMessage = (data) => {
  return (dispatch) => {
    const key = 'Contact';
    dispatch(loadingAction(true, key));
    sendContactMe(data)
      .then((res) => {
        dispatch(failedAction('SUKSES', key));
        dispatch(failedAction('', key));
      })
      .catch((err) => {
        dispatch(failedAction(err.msg, key));
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
