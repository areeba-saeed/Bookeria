import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

import { Link } from "react-router-dom";

const Products = () => {
  const [books, setbooks] = useState([]);
  const [filter, setFilter] = useState(books);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const id = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (!id) {
      dispatch(addCart(product));
    } else {
      axios
        .patch(`https://bookeriaapi-4c4e83f96829.herokuapp.com/api/cart/addcart/${id}/${product._id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://bookeriaapi-4c4e83f96829.herokuapp.com/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://bookeriaapi-4c4e83f96829.herokuapp.com/api/books")
      .then((response) => {
        setbooks(response.data);
        setFilter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Loading = () => {
    return (
      <div>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </div>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = books.filter((item) => item.category._id === cat);
    console.log(updatedList);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(books)}>
            All
          </button>
          {categories.map((row) => {
            return (
              <button
                className="btn btn-outline-dark btn-sm m-2"
                onClick={() => filterProduct(row._id)}>
                {row.name}
              </button>
            );
          })}
        </div>
        {filter.map((product) => {
          const imageUri = `https://bookeriaapi-4c4e83f96829.herokuapp.com/api/books/images/${product.image}`;
          const parser = new DOMParser();
          const html = product.description;
          const doc = parser.parseFromString(html, "text/html");
          const plainText = doc.body.textContent;

          const limitedText =
            plainText.length <= 90
              ? plainText
              : plainText.substring(0, 90) + "...";

          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={imageUri}
                  alt="Card"
                  height={500}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <div className="card-text">{limitedText}</div>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{product.price} PKR</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.urlName}
                    className="btn btn-dark m-1">
                    Details
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Books</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
