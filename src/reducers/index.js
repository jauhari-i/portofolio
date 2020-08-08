import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import HomeReducer from '../pages/Home/reducer';
import AlbumReducer from '../pages/Album/reducer';
import AboutReducer from '../pages/About/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  Home: HomeReducer,
  Album: AlbumReducer,
  About: AboutReducer,
});

export default rootReducer;
