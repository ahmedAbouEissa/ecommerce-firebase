import React, { useState } from "react";
import collapsible from "react-collapsible";
import { db } from "./firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import "./styling/form.css";
import Collapsible from "react-collapsible";

const AddProductsForm = ({ getProducts }) => {
  const [productName, setProductName] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const dbref = collection(db, "store");

  const add = async () => {
    const addData = await addDoc(dbref, {
      product: productName,
      Image: image,
      Price: price,
      Description: description,
    });
    if (addData) {
      alert("Product Added Successfully");
      getProducts();
    } else {
      alert("Error Occured While Adding Product");
    }
  };

  return (
    <>
      <Collapsible
        className="collapsibleForm-container"
        trigger="Add Product"
        triggerWhenOpen="Close"
      >
        <div className="form-container">
          <h2>Add / update Form</h2>
          <div className="inputFiled">
            <input
              type="text"
              placeholder="Porduct Name"
              autoComplete="off"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="inputFiled">
            <input
              type="text"
              placeholder="Image"
              autoComplete="off"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="inputFiled">
            <input
              type="text"
              placeholder="Price"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="inputFiled">
            <input
              type="text"
              placeholder="Description"
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button onClick={add}>Add Product</button>
        </div>
      </Collapsible>
    </>
  );
};

export default AddProductsForm;
