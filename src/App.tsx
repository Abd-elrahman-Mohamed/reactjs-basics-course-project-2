import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/MyModal";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

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
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  let [isOpen, setIsOpen] = useState(false);

  console.log("errors", errors);

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

    // const { title, description, imageURL, price } = product;

    // const errors = productValidation({
    //   title,
    //   description,
    //   imageURL,
    //   price,
    // });

    // const hasErrorMsg =
    //   Object.values(errors).some((value) => value === "") &&
    //   Object.values(errors).every((value) => value === "");

    // if (!hasErrorMsg) {
    //   setErrors(errors);
    //   return;
    // }
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

    console.log(errors);

    // if any property has empty value &&

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    console.log(hasErrorMsg);

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    console.log("No Error Messages");

    close();
  };

  const onCancel = () => {
    console.log("Cancel");

    close();
  };

  // **Render
  const products = productList.map((product) => (
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

  return (
    <main className="container ">
      <Button onClick={open} className="bg-indigo-700 hover:bg-indigo-800 ">
        Add
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {products ? products : <h1>No Products Yet</h1>}
        {/* <ProductCard colors={} description="" imageURL="" price="" productName="" /> */}
        <MyModal isOpen={isOpen} close={close} title="Add A New Product">
          <div>
            <form className="space-y-3" onSubmit={submitHandler}>
              {renderFormInputList}
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
//
export default App;
