import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  onClick?: () => {};
}

const CircleColor = ({ color, onClick }: IProps) => {
  return (
    <span
      className={`block w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></span>
  );
};

export default CircleColor;
