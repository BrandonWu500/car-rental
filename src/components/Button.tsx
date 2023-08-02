import { VariantProps, cva } from 'cva';
import { IconType } from 'react-icons';

const buttonStyles = cva(
  `relative disabled:opacity-70 disabled:cursor-not-allowed
rounded-lg hover:opacity-80 transition
   `,
  {
    variants: {
      intent: {
        primary: `text-white bg-rose-500 border-rose-500`,
        secondary: `bg-white border-black text-black`,
      },
      size: {
        small: 'text-sm p-1 font-light border-[1px]',
        medium: 'text-md p-3 font-semibold border-2',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
      fullWidth: true,
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  intent,
  size,
  fullWidth,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles({ intent, size, fullWidth })}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};
export default Button;
