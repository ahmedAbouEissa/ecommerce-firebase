import React, { useState } from "react";
import AddProductsForm from "./addProductsForm";
import "./styling/nav.css";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const NavBar = ({ getProducts, getProductsInCart, cartData }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const dbcart = collection(db, "cart");

  const openCloseDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  const incrementDecrementCounter = async (productData, counterType) => {
    const dbRef = doc(dbcart, productData.refId);
    if (productData.qty == 1 && counterType == "dec") {
      const deleteFromCartRes = await deleteDoc(dbRef);
      if (deleteFromCartRes == undefined) {
        alert("Product deleted from cart successfully");
      } else {
        alert("Product failed to be deleted from cart");
      }
    } else {
      const updateProductQtyRes = await updateDoc(dbRef, {
        ...productData,
        qty: counterType == "inc" ? productData.qty + 1 : productData.qty - 1,
      });
      if (updateProductQtyRes == undefined) {
        alert("Product qty updated successfully");
      } else {
        alert("Product failed to be updated in cart");
      }
    }
    getProductsInCart();
  };

  return (
    <>
      <div className="nav-container">
        <h2>Products</h2>
        <AddProductsForm getProducts={getProducts} />
        <div className="cart-wrapper" onClick={() => openCloseDrawer()}>
          <h5 className="cart-h5">Cart</h5>
          <img
            className="cartImg"
            src="https://assets.website-files.com/5badda2935e11303a89a461e/5baf75c3bf02346640399fec_cart-icon.svg"
          />
          <div className="add-to-cart">{cartData.length}</div>
        </div>
        {toggleDrawer && (
          <div className="drawer-container">
            <div className="close-drawer">
              <h4 onClick={() => openCloseDrawer()}>X</h4>
            </div>
            {cartData.map((product) => {
              return (
                <div
                  className="cart-product-details-container"
                  key={product.id}
                >
                  <div className="cart-product-details">
                    <img src={product.Image} />
                    <h4>{product.product}</h4>
                  </div>
                  <div className="cart-counter-details">
                    <button
                      onClick={() => incrementDecrementCounter(product, "inc")}
                    >
                      +
                    </button>
                    <h4>{product.qty}</h4>
                    <button
                      onClick={() => incrementDecrementCounter(product, "dec")}
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
