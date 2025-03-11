import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef  } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import classNames from 'classnames';

// const DynamicForm = ({ formData, onSubmit, updateFormValues }) => {
const DynamicForm = forwardRef(({ formData, onSubmit, updateFormValues }, ref)=>{
  const [formValues, setFormValues] = useState(updateFormValues || {});
  const [isFormValid, setIsFormValid] = useState(false);

  const buttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerSave: (data) => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    },
  }));

  useEffect(() => {
    validateForm();
  }, [formValues, formData]);

  const handleInputChange = (key, event) => {
    const value = event.target.value;
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSelectChange = (key, selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileChange = (key, event) => {
    if (!event) {
      console.error("No file selected.");
      return;
    }
    if (event.target.files && event.target.files[0]) {
      let payload = {
        fileName: event.target.files[0].name,
        fileType: event.target.files[0].type,
      };
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        const base64Image = reader.result;
        payload.imageData = base64Image;
        setFormValues((prevState) => ({
          ...prevState,
          [key]: payload,
        }));
      };
    }
  }

  const handleDateChange = (key, date) => {
    const value = date ? moment(date).format('DD-MM-YYYY') : '';
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const isValid = formData.every((field) => {
      if (field.required) {
        if (field.type === 'file') {
          return formValues[field.key] && formValues[field.key].imageData !== '';
        }
        else {
          return formValues[field.key] && formValues[field.key].trim() !== '';
        }
      }
      return true;
    });
    setIsFormValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      onSubmit(formValues);
    }
  };

  return (
    <div className='row p-0 m-0'>
      <form onSubmit={handleSubmit} className='row col-md-12'>
        {formData.map((item) => {
          if (item.type === 'text' || item.type === 'number' || item.type === 'password') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <input
                  type={item.type}
                  className="form-control"
                  id={item.key}
                  value={formValues[item.key] || ''}
                  onChange={(e) => handleInputChange(item.key, e)}
                  placeholder={item.placeholder}
                  required={item.required}
                  aria-label={item.label}
                />
              </div>
            );
          } else if (item.type === 'select') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <Select
                  options={item.options}
                  value={item.options.find(option => option.value === formValues[item.key]) || null}
                  onChange={(selectedOption) => handleSelectChange(item.key, selectedOption)}
                  required={item.required}
                  aria-label={item.label}
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            );
          } else if (item.type === 'date') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <DatePicker
                  selected={formValues[item.key] ? moment(formValues[item.key], "DD-MM-YYYY").toDate() : null}
                  onChange={(date) => handleDateChange(item.key, date)}
                  className="form-control"
                  placeholderText={item.placeholder}
                  dateFormat="dd-MM-yyyy"
                  required={item.required}
                  aria-label={item.label}
                  minDate={eval(item.minDate)}
                  maxDate={eval(item.maxDate)}
                  portalId="root"
                />
              </div>
            );
          } else if (item.type === 'btn') {
            return (
              <div key={item.key} className='col-md-3 p-2 d-flex align-items-end'>
                <button ref={buttonRef} className={classNames('btn btn-primary',(ref ? 'd-none':''))} type="submit" disabled={!isFormValid}>
                  {item.label}
                </button>
              </div>
            );
          } else if (item.type === 'textarea') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <textarea
                  className="form-control"
                  id={item.key}
                  value={formValues[item.key] || ''}
                  onChange={(e) => handleInputChange(item.key, e)}
                  placeholder={item.placeholder}
                  required={item.required}
                  aria-label={item.label}
                ></textarea>
              </div>
            );
          } else if (item.type === 'file') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <input
                  className="form-control"
                  type={item.type}
                  id={item.key}
                  // value={formValues[item.key] || ''}
                  onChange={(e) => handleFileChange(item.key, e)}
                  placeholder={item.placeholder}
                  required={item.required}
                  aria-label={item.label}
                ></input>
              </div>
            );
          } else {
            return null;
          }
        })}
      </form>
    </div>
  );
});

export default DynamicForm;
