import React from 'react';
import { Field } from 'redux-form';
import { useSelector } from 'react-redux';

const TextField = (props) => {
  const { input, inputProps, meta } = props;
  const { dirty, error, touched } = meta;
  return (
    <>
      {inputProps.label && <label>{inputProps.label}</label>}
      <input {...input} {...inputProps} />
      {error && (dirty || touched) && <small className="error-field">{error}</small>}
    </>
  );
};

const TextArea = (props) => {
  const {
    input,
    inputProps,
    meta: { touched, error },
  } = props;

  return (
    <div>
      <textarea {...input} {...inputProps} />
      {touched && error && <span className="error-field">{error}</span>}
    </div>
  );
};

const ContactForm = (props) => {
  const { handleSubmit, invalid } = props;
  const { isLoadingContact, message } = useSelector((s) => s.About);
  const disabled = invalid || isLoadingContact;

  const renderTextField = (name, placeholder, label) => {
    const inputProps = {
      placeholder,
      autoComplete: 'off',
    };
    return (
      <div className="input-group">
        <p>{label}</p>
        <Field component={TextField} inputProps={inputProps} name={name} />
      </div>
    );
  };

  const renderNumberField = (name, placeholder, label) => {
    const inputProps = {
      placeholder,
      autoComplete: 'off',
      type: 'number',
    };
    return (
      <div className="input-group">
        <p>{label}</p>
        <Field component={TextField} type="number" inputProps={inputProps} name={name} />
      </div>
    );
  };

  const renderTextArea = (name, placeholder, label) => {
    const inputProps = {
      placeholder,
    };
    return (
      <div className="input-group">
        <p>{label}</p>
        <Field component={TextArea} inputProps={inputProps} name={name} />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            {renderTextField('name', 'Your Name', 'Your Name')}
            {renderTextField('from', 'Your Email', 'Your Email')}
            {renderNumberField('phone', 'Your Phone', 'Your Phone')}
          </div>
          <div className="col-md-6">{renderTextArea('message', 'Message', 'Message')}</div>
        </div>
      </div>
      <div className="center">
        {message !== 'SUKSES' && message}
        <button disabled={disabled} type="submit" className="button-submit">
          {isLoadingContact ? 'Sending.....' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
