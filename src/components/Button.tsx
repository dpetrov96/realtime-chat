const Button = ({ children, ...restProps }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...restProps}>{children}</button>
)

export default Button;
