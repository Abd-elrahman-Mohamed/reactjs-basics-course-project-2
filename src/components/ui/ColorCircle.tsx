interface IProps {
  colors: string[];
}

const ColorCircle = ({ colors }: IProps) => {
  const colorsMap = colors.map((color) => {
    <span className={`w-5 h-5 rounded-full bg-[${color}]`}></span>;
  });
  return <>{colorsMap}</>;
};

export default ColorCircle;
