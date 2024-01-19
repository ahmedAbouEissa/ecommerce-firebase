import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import "./styling/form.css";
import NavBar from "./navBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [addToCartListener, setAddToCartListener] = useState(false);
  const [cartData, setCartData] = useState([]);
  const dbref = collection(db, "store");
  const dbcart = collection(db, "cart");

  const getProducts = async () => {
    const firbaseRes = await getDocs(dbref);
    const response = firbaseRes.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(response);
  };

  const addToCart = async (productData) => {
    setAddToCartListener(true);
    const checkIfProductAlreadyInCart = cartData.filter(
      (product) => product.id == productData.id
    ).length;
    const productRefIdQtyInCart = cartData.find(
      (product) => product.id == productData.id
    );
    if (checkIfProductAlreadyInCart) {
      const updateRef = doc(dbcart, productRefIdQtyInCart.refId);
      const updateProductQtyRes = await updateDoc(updateRef, {
        ...productData,
        qty: productRefIdQtyInCart.qty + 1,
      });
      if (updateProductQtyRes == undefined) {
        alert("Product updated in cart successfully");
      } else {
        alert("Product failed to be updated in cart");
      }
    } else {
      const addProductToCart = await addDoc(dbcart, {
        id: productData.id,
        product: productData.product,
        Image: productData.Image,
        Price: productData.Price,
        Description: productData.Description,
        qty: 1,
      });
      if (addProductToCart) {
        alert("Product Added To Cart");
      } else {
        alert("Error Occured While Adding Product");
      }
    }
    setTimeout(() => {
      setAddToCartListener(false);
    }, 500);
  };

  const getProductsInCart = async () => {
    const firbaseRes = await getDocs(dbcart);
    const cartData = firbaseRes.docs.map((doc) => ({
      refId: doc.id,
      ...doc.data(),
    }));
    setCartData(cartData);
  };

  useEffect(() => {
    getProducts();
    getProductsInCart();
  }, [addToCartListener]);

  return (
    <>
      <div className="products">
        <NavBar
          getProducts={getProducts}
          getProductsInCart={getProductsInCart}
          cartData={cartData}
        />
        <div className="products-container">
          {products.map((productData) => {
            return (
              <div className="product-details" key={productData.id}>
                <img
                  className="product-image"
                  src={productData.Image}
                  alt="logo"
                />
                <h5>{productData.product}</h5>
                <h5>{productData.Price} $</h5>
                <h6>{productData.Description}</h6>
                <button onClick={() => addToCart(productData)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
