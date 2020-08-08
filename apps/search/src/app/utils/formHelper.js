// Form Helper to render input field and validation. 
import React, { Component } from 'react'
import validator from 'validator'
// import uniqid from 'uniqid' //Create Uniqid based on current time
import Select from 'react-select'
import 'react-select/dist/react-select.css'

//Need to find out how to import translation
export class renderSelect extends Component {
  constructor(props) {
    super(props)
  }
   
  onChange(event) {
    if (this.props.input.onChange && event != null) {
     this.props.input.onChange(event.value);
    } else {
     this.props.input.onChange(null);
    }
  }
   
  render () {
    let {
      input,
      label,
      appendLabel,
      placeholder,
      componentClass,
      meta: { touched, error, warning },
      selectOptions
    } = this.props
  
    let fieldId = input['name']
    let labelHtml = ''
    if (label) {
      labelHtml = <label htmlFor={fieldId}>{label}</label>
    } 
    
    componentClass = touched && error ?  componentClass + ' error' : componentClass
    const options = selectOptions.data.payload.map( r => {
      return {label: r.name, value: r.id}
    }) 

    return (
      <div >
        <Select
          {...input}
          id={fieldId}
          placeholder={placeholder}
          options={options}
          value={this.props.input.value || ''}
          onBlur={() => this.props.input.onBlur(this.props.input.value)}
          onChange={this.onChange.bind(this)}
          searchable={true}
          className={componentClass}
          />
        {appendLabel && labelHtml}
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    )
  }
}

export const renderInputField = props => {
  let {
    input,
    label,
    type,
    appendLabel,
    placeholder,
    componentClass,
    fieldClass,
    meta: { touched, error, warning },
    style
  } = props

  let fieldId = input['name']
  let labelHtml = ''
  if (label) {
    labelHtml = <label htmlFor={fieldId}>{label}</label>
  } 
  
  componentClass = touched && error ?  componentClass + ' error' : componentClass

  return (
    <div className={componentClass}>
      <input
        {...input}
        id={fieldId}
        className={fieldClass}
        placeholder={placeholder}
        type={type}
        style={style}
        />
      {appendLabel && labelHtml}
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )
}

export const renderSelectField = props => {
  let {
    input,
    label,
    appendLabel,
    placeholder,
    componentClass,
    fieldClass,
    meta: { touched, error, warning },
    selectOptions
  } = props

  let fieldId = input['name']
  let labelHtml = ''
  if (label) {
    labelHtml = <label htmlFor={fieldId}>{label}</label>
  } 
  
  componentClass = touched && error ?  componentClass + ' error' : componentClass
  
  return (
    <div className={componentClass}>
      {!appendLabel && labelHtml}
      <select
        {...input}
        id={fieldId}
        className={fieldClass}
        placeholder={placeholder}
        >
        {
          selectOptions.data.payload.map( r => 
            (
              <option value={r.id} key={r.id}>
                {r.name}
              </option>
            )
          )
        }
      </select>
      {appendLabel && labelHtml}
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  )  
}

export const required = value => {
  if (!value) {
    return <span className="error-text">This field is required.</span>
  }
}

export const email = value => {
  if (!validator.isEmail(value)) {
    return <span className="error-text">{value} is not a valid email.</span>
  }
}

export const phoneNumber = value => {
 //To Do: Need to find out where the localE store at
  if (!validator.isMobilePhone(value,'en-US')) {
    return <span className="error-text">{value} is not a valid phone number.</span>
  }
}
