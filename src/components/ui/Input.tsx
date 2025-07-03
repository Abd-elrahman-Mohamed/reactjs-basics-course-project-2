import type { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...rest }: IProps) => {
  return (
    <input
      className={`border border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1.5 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md `}
      {...rest}
    />
  );
};

export default Input;
