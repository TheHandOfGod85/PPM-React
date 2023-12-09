import { ComponentProps, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import FormInputField from './FormInputField'

interface PasswordInputFieldProps {
  register: UseFormRegisterReturn
  label?: string
  error?: FieldError
}

export default function PasswordInputField({
  register,
  label,
  error,
  ...props
}: PasswordInputFieldProps &
  ComponentProps<'input'> &
  ComponentProps<'textarea'>) {
  const [showpassword, setShowPassword] = useState(false)
  return (
    <FormInputField
      register={register}
      label={label}
      error={error}
      {...props}
      type={showpassword ? 'text' : 'password'}
      inputGroupElement={
        <button
          type="button"
          id={register.name + '-toggle-visibility-button'}
          className="btn join-item"
          onClick={() => setShowPassword(!showpassword)}
        >
          {showpassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      }
    />
  )
}
