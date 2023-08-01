interface MenuItemProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: string;
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-3
  font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </div>
  );
};
export default MenuItem;
