import ModalsProvider from '@/providers/ModalsProvider';
import Navbar from './navbar/Navbar';
import ToasterProvider from '@/providers/ToasterProvider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ModalsProvider />
      <ToasterProvider />
      <Navbar />
      {children}
    </>
  );
};
export default Layout;
