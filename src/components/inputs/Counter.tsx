import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterBtnProps {
  onClick: React.MouseEventHandler;
  icon: IconType;
  ariaLabel: string;
}

const CounterBtn = ({ onClick, icon: Icon, ariaLabel }: CounterBtnProps) => (
  <button
    onClick={onClick}
    className="flex h-10 w-10 items-center justify-center
  rounded-full border-[1px] border-neutral-400
  text-neutral-600 transition hover:opacity-80"
    aria-label={ariaLabel}
  >
    <Icon />
  </button>
);

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-center gap-8">
      <CounterBtn onClick={onReduce} icon={AiOutlineMinus} ariaLabel="reduce" />
      <p className="text-xl font-light text-neutral-600">{value}</p>
      <CounterBtn onClick={onAdd} icon={AiOutlinePlus} ariaLabel="add" />
    </div>
  );
};
export default Counter;
