export type DialogProps = {
  title?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, title, children }: DialogProps) => isOpen ? (
  <div
    className="fixed w-full h-full flex items-center justify-center left-0 top-0 bg-white/70"
  >
    <div className="bg-white p-4 rounded-sm shadow-xl">
      {Boolean(title) && (
        <h2>{title}</h2>
      )}
      {children}
    </div>
  </div>
) : <></>;

export default Dialog;