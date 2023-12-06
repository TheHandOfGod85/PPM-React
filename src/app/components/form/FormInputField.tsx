import { ComponentProps } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
interface FormInputFieldProps {
  register: UseFormRegisterReturn
  label?: string
  textarea?: boolean
  error?: FieldError
  isFileStyle?: boolean
  inputGroupElement?: JSX.Element
}

export default function FormInputField({
  register,
  label,
  textarea,
  error,
  isFileStyle,
  inputGroupElement,
  ...props
}: FormInputFieldProps & ComponentProps<'input'> & ComponentProps<'textarea'>) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      {textarea ? (
        <>
          <textarea
            {...register}
            {...props}
            className="textarea textarea-bordered textarea-md w-full"
          ></textarea>
          {error && (
            <p className=" mt-2 ml-2 text-sm textarea-error">
              {error?.message}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="join join-horizontal">
            <input
              {...register}
              {...props}
              className={
                isFileStyle
                  ? 'file-input file-input-bordered file-input-md w-full join-item'
                  : 'input input-bordered input-md w-full join-item'
              }
              aria-describedby={inputGroupElement?.props.id}
            />
            {inputGroupElement}
          </div>
          {error && (
            <p className=" mt-2 ml-2 text-sm text-error">{error?.message}</p>
          )}
        </>
      )}
    </div>
  )
}
