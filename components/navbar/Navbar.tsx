import { useCurrentUser } from '@/hooks/useCurrentUser';
import Container from '../Container';
import Categories from '../categories/Categories';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <div
      className="fixed z-10 w-full bg-white shadow-sm"
      data-testid={currentUser ? 'logged-in' : 'logged-out'}
    >
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
