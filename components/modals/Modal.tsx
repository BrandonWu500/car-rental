import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50
  flex items-center justify-center overflow-hidden
  overflow-y-auto bg-neutral-800/70 outline-none focus:outline-none"
    >
      <div
        className="relative mx-auto my-6 h-full w-full
    md:h-auto md:w-2/3 lg:w-1/2 xl:w-2/5"
      >
        {/* CONTENT */}
        <div
          className={`translate h-full duration-300
        ${showModal ? 'translate-y-0' : 'translate-y-full'}
        ${showModal ? 'opacity-100' : 'opacity-0'}
        `}
        >
          <div
            className="translate relative flex h-full
          w-full flex-col rounded-lg border-0 bg-white shadow-lg
          outline-none focus:outline-none md:h-auto"
          >
            {/* HEADER */}
            <div
              className="relative flex items-center
            justify-center rounded-t border-b-[1px] p-6"
            >
              <button
                onClick={handleClose}
                aria-label="close"
                className="absolute left-9 border-0
              p-1 transition hover:opacity-70"
              >
                <IoMdClose size={18} />
              </button>
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>

            {/* BODY */}
            <div className="relative flex-auto p-6">{body}</div>

            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex w-full items-center gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
