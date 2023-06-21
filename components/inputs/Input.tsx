import { useCallback, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordShow = useCallback(() => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
    setShowPassword((value) => !value);
  }, []);

  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className={`absolute
    left-2 top-5 text-neutral-700`}
        />
      )}
      <input
        autoComplete="off"
        type={inputType}
        id={id}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-8
      font-light outline-none transition disabled:cursor-not-allowed
      disabled:opacity-70
      ${formatPrice ? 'pl-9' : 'pl-4'}
      ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
      ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
      `}
      />
      <label
        htmlFor={id}
        className={`text-md absolute top-5 z-10
      origin-[0] -translate-y-3 transform text-neutral-500 duration-150
      ${formatPrice ? 'left-9' : 'left-4'}
      peer-placeholder-shown:translate-y-0
      peer-placeholder-shown:scale-100
      peer-focus:-translate-y-4
      peer-focus:scale-75
      ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
      {type === 'password' && (
        <button onClick={togglePasswordShow} className="absolute right-5 top-6">
          {!showPassword ? 'SHOW' : 'HIDE'}
        </button>
      )}
    </div>
  );
};
export default Input;
