import { VariantProps, cva } from 'cva';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback } from 'react';

const categoryBoxStyles = cva(
  `flex cursor-pointer flex-col items-center justify-center
gap-2 border-b-2 p-3 transition hover:text-neutral-800
max-w-md
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
  const router = useRouter();
  const { query } = router;

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (query) {
      currentQuery = queryString.parse(query.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // remove selection if user clicks same category again
    if (query.category === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, query]);

  return (
    <div onClick={handleClick} className={categoryBoxStyles({ selected })}>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
export default CategoryBox;
