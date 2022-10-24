import React from "react";
import "./addProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ fetchProducts }) => {
  const navigate = useNavigate();
  const onSubmitForm = async (e) => {
    const newProduct = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
      price: e.target.price.value,
      description: e.target.description.value,
    };
    console.log(newProduct);
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin/add-product", newProduct)
      .then(fetchProducts())
      .catch((err) => console.log(err));

    await navigate("/home");
  };
  return (
    <div className="form-container">
      <form
        className="form-control"
        onSubmit={(values) => onSubmitForm(values)}
        action="/admin/add-product"
        method="POST"
      >
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input className="form-input" type="text" name="title" id="title" />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            className="form-input"
            type="text"
            name="imageUrl"
            id="imageUrl"
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            className="form-input"
            type="number"
            name="price"
            id="price"
            step="0.01"
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-input"
            name="description"
            id="description"
          ></textarea>
        </div>
        <button type="submit" className="btn-add-product">
          Add product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
