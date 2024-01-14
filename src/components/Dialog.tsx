export type DialogProps = {
  isOpen: boolean;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, children }: DialogProps) => isOpen ? (
  <div
    className="fixed w-full h-full flex items-center justify-center left-0 top-0 bg-white/70"
  >
    <div className="bg-white p-4 rounded-sm shadow-sm">
      {children}
    </div>
  </div>
) : <></>;

export default Dialog;