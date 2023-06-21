import { CATEGORIES } from '@/constants';
import Container from '../Container';

const Categories = () => {
  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto pt-4">
        {CATEGORIES.map((category) => (
          <div key={category.label}></div>
        ))}
      </div>
    </Container>
  );
};
export default Categories;
