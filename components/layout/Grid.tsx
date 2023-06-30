interface GridProps {
  children: React.ReactNode;
}

const Grid = ({ children }: GridProps) => {
  return (
    <div
      className="
          mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
    >
      {children}
    </div>
  );
};
export default Grid;
