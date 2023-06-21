import { VariantProps, cva } from 'cva';

const categoryBoxStyles = cva(
  `flex cursor-pointer flex-col items-center justify-center
gap-2 border-b-2 p-3 transition hover:text-neutral-800
`,
  {
    variants: {
      selected: {
        true: 'border-b-neutral-800 text-neutral-800',
        false: 'border-transparent text-neutral-500',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface CategoryBoxProps extends VariantProps<typeof categoryBoxStyles> {
  label: string;
}

const CategoryBox = ({ label, selected }: CategoryBoxProps) => {
  return (
    <div className={categoryBoxStyles({ selected })}>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
export default CategoryBox;
