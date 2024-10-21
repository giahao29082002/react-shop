import React from 'react'

const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className='add-product-InputCSS'
      >
        {
          Array.isArray(options) && options.length > 0
            ? options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))
            : <option value="">No options available</option>
        }
      </select>
    </div>
  )
}

export default SelectInput
