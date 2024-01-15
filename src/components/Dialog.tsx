import { useOutsideClick } from '@/hooks';
import { CloseIcon } from '@/icons';
import { useEffect } from 'react';

export type DialogProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, title, onClose, children }: DialogProps) => {
  const dialogContentRef = useOutsideClick(() =>
    onClose()
  );

  useEffect(() => {
    const handleEsc = (event: { key: string; }) => {
       if (event.key === 'Escape') {
        onClose()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return isOpen ? (
    <div
      className="fixed z-20 w-full h-full flex items-center justify-center left-0 top-0 bg-white/70 overflow-y-auto"
    >
      <div ref={dialogContentRef} className="border border-gray-200 md:w-[400px] bg-white p-4 rounded-md shadow-lg">
        <div className="relative mb-6">
          {Boolean(title) && (
            <h2 className="text-xl text-center mt-2 font-bold">
              {title}
            </h2>
          )}
          <button onClick={onClose} className="absolute right-0 top-[-6px] cursor-pointer hover:bg-gray-200 rounded-full p-2 text-gray-500">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
) : <></>;}

export default Dialog;