import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DynamicForm = ({ formData, onSubmit }) => {
  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleDateChange = (key, date) => {
    const value = date ? moment(date).format('MM-DD-YYYY') : '';
    setFormValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(formValues)
  };

  const validateForm = () => {
    const isValid = formData.every((field) => {
      if (field.required) {
        return formValues[field.key] && formValues[field.key].trim() !== '';
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
          if (item.type === 'text' || item.type === 'number') {
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
                />
              </div>
            );
          } else if (item.type === 'date') {
            return (
              <div key={item.key} className='col-md-3 p-2'>
                <label htmlFor={item.key}>{item.label}</label>
                <DatePicker
                  selected={formValues[item.key] ? moment(formValues[item.key]).toDate() : null}
                  onChange={(date) => handleDateChange(item.key, date)}
                  className='form-control'
                  placeholderText={item.placeholder}
                  dateFormat="MMMM d, yyyy"
                  required={item.required}
                  aria-label={item.label}
                />
              </div>
            );
          } else if (item.type === 'btn') {
            return (
              <div key={item.key} className='col-md-3 p-2 d-flex align-items-end'>
                <button className='btn btn-primary' type="submit" disabled={!isFormValid}>
                  {item.label}
                </button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </form>
    </div>
  );
};

export default DynamicForm;
