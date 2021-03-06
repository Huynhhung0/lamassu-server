import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import NotificationsCtx from '../NotificationsContext'

import Header from './EditHeader'
import EditableNumber from './EditableNumber'

const SingleFieldEditableNumber = ({
  title,
  label,
  width = 80,
  name,
  section,
  className
}) => {
  const {
    save,
    data,
    currency,
    isEditing,
    isDisabled,
    setEditing
  } = useContext(NotificationsCtx)

  const schema = Yup.object().shape({
    [name]: Yup.number()
      .integer()
      .min(0)
      .required()
  })

  return (
    <Formik
      enableReinitialize
      initialValues={{ [name]: (data && data[name]) ?? '' }}
      validationSchema={schema}
      onSubmit={it => save(section, schema.cast(it))}
      onReset={() => {
        setEditing(name, false)
      }}>
      <Form className={className}>
        <Header
          title={title}
          editing={isEditing(name)}
          disabled={isDisabled(name)}
          setEditing={it => setEditing(name, it)}
        />
        <EditableNumber
          label={label}
          name={name}
          editing={isEditing(name)}
          width={width}
          displayValue={x => (x === '' ? '-' : x)}
          decoration={currency}
        />
      </Form>
    </Formik>
  )
}

export default SingleFieldEditableNumber
