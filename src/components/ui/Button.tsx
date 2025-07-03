import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: 'w-full' | 'w-fit';
}

const Button = ({ children, className, width, ...rest }: IProps) => {
  return (
    <button
      className={`px-5 py-3 rounded-lg text-white  ${(width =
        "w-full")} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
