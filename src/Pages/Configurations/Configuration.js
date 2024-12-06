import React from 'react'
import { useLocation } from 'react-router-dom';
import Table from '../../Shared/Table/Table';
import DyanmicForm from '../../Shared/DynamicForm/DyanmicForm';
import { useNavigate } from 'react-router';

const Configuration = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { details } = location.state || {};
  const birdsPrice = [
    {
      "key": "date",
      "label": "Date",
      "type": "date",
      "placeholder": "Select Date",
      "required": true
    },
    {
      "key": "price",
      "label": "Birds Price",
      "type": "number",
      "placeholder": "Enter Price",
      "required": true,
      "value": "123"
    },
    {
      "key": "test",
      "label": "Birds",
      "type": "select",
      "placeholder": "Select Price",
      "options": [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ],
      "required": true,
      "value": "option1"
    },
    {
      "key": "save",
      "label": "Save",
      "type": "btn"
    }
  ]
  const hensAvailability = [
    {
      "key": "date",
      "label": "Date",
      "type": "date",
      "placeholder": "Select Date",
      "required": true
    },
    {
      "key": "price",
      "label": "Birds Price",
      "type": "number",
      "placeholder": "Enter Price",
      "required": true
    },
    {
      "key": "save",
      "label": "Save",
      "type": "btn"
    }
  ]
  const getData = (data) => {
    console.log('getting from dynamic component', data)
  }
  const routeToSettings = () => {
    navigate('/Home/settings')
  }
  return (
    <div className='pageContainer m-1'>
      <span className='cursor-pointer' onClick={() => routeToSettings()}><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</span>
      <DyanmicForm formData={birdsPrice} onSubmit={getData} />
      <Table />
    </div>
  )
}

export default Configuration