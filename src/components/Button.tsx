const Button = ({ children, ...restProps }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="transition-all bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-400"
    {...restProps}
  >
    {children}
  </button>
)

export default Button;
