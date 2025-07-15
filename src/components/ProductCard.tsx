import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";
import ColorCircle from "./ui/ColorCircle";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, colors } = product;

  // render
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image
        alt={title}
        imageURL={imageURL}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex items-center flex-wrap space-x-1">
        {renderProductColors}
      </div>
      <div className="flex items-center space-x-2">
        <ColorCircle colors={colors} />
      </div>

      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          alt={title}
          imageURL={imageURL}
          className="w-10 h-10 rounded-full object-center"
        />
      </div>

      <div className="flex items-center justify-between gap-2 mt-5">
        <Button className="bg-indigo-700">EDIT</Button>
        <Button className="bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
