import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import Navbar from '../navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const ModalsProvider = useMemo(
    () =>
      dynamic(() => import('@/providers/ModalsProvider'), {
        ssr: false,
      }),
    []
  );
  const ToasterProvider = useMemo(
    () =>
      dynamic(() => import('@/providers/ToasterProvider'), {
        ssr: false,
      }),
    []
  );
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
