import { CATEGORIES } from '@/constants';
import { useRouter } from 'next/router';
import Container from '../Container';
import CategoryBox from './CategoryBox';

const Categories = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategory = query.category;

  // since part of navbar component and only want to show on home page
  if (pathname !== '/') {
    return null;
  }

  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto pt-2">
        {CATEGORIES.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            selected={selectedCategory === category.label}
          />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
