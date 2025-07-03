import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Dialog";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

const App = () => {
  // **State

  let [isOpen, setIsOpen] = useState(false);

  // **Handler
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  // **Render
  const products = productList.map((product) => (
    <ProductCard product={product} />
  ));
  const renderFormInputList = formInputsList.map(
    ({ id, name, label, type }) => (
      <div className="flex flex-col mb-2">
        <label htmlFor={id} className="mb text-sm font-medium text-gray-700">
          {" "}
          {label}{" "}
        </label>
        <Input
          type={type}
          name={name}
          id={id}
          className="border-2 border-gray-300"
        />
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
            <form className="space-y-3">
              {renderFormInputList}
              <div className="flex flex-1 space-x-3">
                <Button onClick={close} className="bg-indigo-700">
                  Submit
                </Button>
                <Button onClick={close} className="bg-gray-400">
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
