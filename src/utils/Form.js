import React from 'react'
import {
  Button, Form, FormGroup, Label, Input, FormText, FormFeedback
} from 'reactstrap'
import _ from 'lodash'

import {
  Formik, Field, ErrorMessage
} from 'formik'
/*
  Component: the parent of the elements below
  Config: the configuration, some compulsory fields:
    - fieldName
    optional field:

*/
export const TextInput = (config) => {
  const inputConfig = _.omit(config, ['fieldName','style'])
  const fn = config.fieldName
  return (
    <FormGroup style={config.style}>
      <Label for={fn}>{fn}</Label>
      <Input name={fn} id={fn} {...inputConfig} />
    </FormGroup>
  )
}

export const SelectInput = (config) => {
  const inputConfig = _.omit(config, ['fieldName','options'])
  const fn = config.fieldName
  return (
    <FormGroup style={config.style}>
      <Label for={fn}>{fn}</Label>
      <Input type="select" name={fn} id={fn} {...inputConfig}>
        {config.options.map(
          opt => (<option key={opt}>{opt}</option>)
        )}
      </Input>
    </FormGroup>
  )
}
export const CreateForm = (config) => {
  const fields = config.map(conf => {
    switch(conf.type) {
      case "select":
        return SelectInput(conf)
      default:
        return TextInput(conf)
    }
  })
  const form = (
    <Form>
      {fields}
    </Form>
  )
  const getFormValues = () => config.reduce(
    (values, { fieldName }) => {
      values[fieldName] = document.getElementById(fieldName).value
      return values
    }, {})
  return { form, getFormValues }
}

export const FormikInput = ({name, type, errors}) => (
  <FormGroup>
    <Label for={name}>{_.startCase(name)}</Label>
    <Input tag={Field} name={name} type={type} invalid={errors && errors[name]}/>
  </FormGroup>
)

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
