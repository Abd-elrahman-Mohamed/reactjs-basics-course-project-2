import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/MyModal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  // **State
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // **Handler
  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setProduct({ ...product, [name]: value });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    // if any property has empty value &&

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };

  const onCancel = () => {
    close();
  };

  // **Render
  const renderProductList = products.map((product) => (
    <ProductCard product={product} />
  ));
  const renderFormInputList = formInputsList.map(
    ({ id, name, label, type }) => (
      <div className="flex flex-col mb-2" key={id}>
        <label htmlFor={id} className="mb text-sm font-medium text-gray-700">
          {" "}
          {label}{" "}
        </label>
        <Input
          type={type}
          name={name}
          id={id}
          className="border-2 border-gray-300"
          value={product[name]}
          onChange={onChangeHandler}
        />
        <ErrorMessage msg={errors[name as keyof typeof errors]} />
      </div>
    )
  );

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={async () => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((co) => co !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container ">
      <Button onClick={open} className="bg-indigo-700 hover:bg-indigo-800 ">
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList ? renderProductList : <h1>No Products Yet</h1>}
        <MyModal isOpen={isOpen} close={close} title="Add A New Product">
          <div>
            <form className="space-y-3" onSubmit={submitHandler}>
              {renderFormInputList}

              <div className="flex items-center flex-wrap space-x-1">
                {tempColors.map((color) => (
                  <span
                    key={color}
                    className={`p-1 mr-1 mb-1 text-xs rounded-md text-white`}
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </span>
                ))}
              </div>

              <div className="flex items-center flex-wrap space-x-1">
                {renderProductColors}
              </div>

              <div className="flex flex-1 space-x-3">
                <Button className="bg-indigo-700" type="submit">
                  Submit
                </Button>
                <Button onClick={onCancel} className="bg-gray-400">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </MyModal>
      </div>
    </main>
  );
};

export default App;
