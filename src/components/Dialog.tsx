export type DialogProps = {
  title?: string;
  isOpen: boolean;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, title, children }: DialogProps) => isOpen ? (
  <div
    className="fixed z-20 w-full h-full flex items-center justify-center left-0 top-0 bg-white/70"
  >
    <div className="border border-gray-200 md:w-[400px] bg-white p-4 rounded-md shadow-lg">
      {Boolean(title) && (
        <h2 className="text-xl text-center mb-4 font-bold">
          {title}
        </h2>
      )}
      {children}
    </div>
  </div>
) : <></>;

export default Dialog;