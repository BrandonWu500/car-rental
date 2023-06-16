import { useCallback, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

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
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordShow = useCallback(() => {
    inputType === "password" ? setInputType("text") : setInputType("password");
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className={`text-neutral-700
    absolute top-5 left-2`}
        />
      )}
      <input
        autoComplete="off"
        type={inputType}
        id={id}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`peer w-full p-4 pt-8 font-light bg-white border-2
      rounded-md outline-none transition disabled:opacity-70
      disabled:cursor-not-allowed
      ${formatPrice ? "pl-9" : "pl-4"}
      ${errors[id] ? "border-rose-500" : "border-neutral-300"}
      ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
      `}
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform
      -translate-y-3 top-5 z-10 origin-[0] text-neutral-500
      ${formatPrice ? "left-9" : "left-4"}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
      {type === "password" && (
        <button onClick={togglePasswordShow} className="absolute top-6 right-5">
          {!showPassword ? "SHOW" : "HIDE"}
        </button>
      )}
    </div>
  );
};
export default Input;
