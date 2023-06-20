import { VariantProps, cva } from 'cva';
import { IconType } from 'react-icons';

const buttonStyles = cva(
  `relative disabled:opacity-70 disabled:cursor-not-allowed
rounded-lg hover:opacity-80 transition w-full 
   `,
  {
    variants: {
      intent: {
        primary: `text-white bg-rose-500 border-rose-500
        text-md py-3 font-semibold border-2`,
      },
      outline: {
        true: `bg-white border-neutral-900 text-neutral-900`,
      },
      small: {
        true: 'text-sm py-1 font-light border-[1px]',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed
  rounded-lg hover:opacity-80 transition w-full
  ${outline ? 'bg-white' : 'bg-rose-500'}
  ${outline ? 'border-black' : 'border-rose-500'}
  ${outline ? 'text-black' : 'text-white'}
  ${small ? 'text-sm' : 'text-md'}
  ${small ? 'py-1' : 'py-3'}
  ${small ? 'font-light' : 'font-semibold'}
  ${small ? 'border-[1px]' : 'border-2'}
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
export default Button;
