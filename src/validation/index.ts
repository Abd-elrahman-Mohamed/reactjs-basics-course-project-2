// productObj === errorsObj (Title,Description,Image,Price)

export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  // returns an object
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^"]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product Title Must Be Between 10 To 80 Characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 80
  ) {
    errors.description =
      "Product Description Must Be Between 10 to 900 Characters";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required";
  }

  if (!product.price.trim() || isNaN(+product.price)) {
    errors.price = "Valid Price is required!";
  }

  return errors;
};
