import { CATEGORIES } from '@/constants';
import Container from '../Container';
import CategoryBox from './CategoryBox';

const Categories = () => {
  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto pt-2">
        {CATEGORIES.map((category) => (
          <CategoryBox key={category.label} label={category.label} />
        ))}
      </div>
    </Container>
  );
};
export default Categories;
