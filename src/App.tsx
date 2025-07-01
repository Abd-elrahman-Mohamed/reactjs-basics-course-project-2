import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Dialog";
import { productList } from "./data";
import Button from "./components/ui/Button";

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

  return (
    <main className="container ">
      <Button onClick={open} className="bg-indigo-700 ">Add</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {products ? products : <h1>No Products Yet</h1>}
        {/* <ProductCard colors={} description="" imageURL="" price="" productName="" /> */}
        <MyModal isOpen={isOpen} close={close} title="Add A New Product">
          <Button onClick={close} className="bg-indigo-700">
            Submit
          </Button>
          <Button onClick={close} className="bg-red-700">
            Cancel
          </Button>
        </MyModal>
      </div>
    </main>
  );
};
//
export default App;
