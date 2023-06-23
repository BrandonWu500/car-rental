import ModalsProvider from '@/providers/ModalsProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import Navbar from './navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ModalsProvider />
      <ToasterProvider />
      <Navbar />
      <main className="pb-20 pt-28">{children}</main>
    </>
  );
};
export default Layout;
