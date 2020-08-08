import { reduxForm } from 'redux-form';
import Component from './ContactForm';
import validate from './validate';

const initialValues = {
  from: '',
  name: '',
  phone: '',
  message: '',
};

export default reduxForm({
  form: 'contactMe',
  initialValues,
  validate,
})(Component);
