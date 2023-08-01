import { VariantProps, cva } from 'cva';

const categoryInputStyles = cva(
  `flex cursor-pointer flex-col gap-3 rounded-xl border-2
p-4 transition hover:border-black max-w-md`,
  {
    variants: {
      selected: {
        true: 'border-black',
        false: 'border-neutral-200',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface CategoryInputProps extends VariantProps<typeof categoryInputStyles> {
  label: string;
  onClick: (value: string) => void;
}

const CategoryInput = ({ label, onClick, selected }: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={categoryInputStyles({ selected })}
    >
      <p className="font-semibold">{label}</p>
    </div>
  );
};
export default CategoryInput;
