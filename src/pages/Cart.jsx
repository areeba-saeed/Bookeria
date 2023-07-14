import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const id = localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://bookeriaapi-4c4e83f96829.herokuapp.com/api/cart/${id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setItems(state);
    }
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    if (id) {
      axios
        .patch(
          `https://bookeriaapi-4c4e83f96829.herokuapp.com/api/cart/addcart/${id}/${product.productId._id}`
        )
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(addCart(product));
    }
  };
  const removeItem = (product) => {
    if (id) {
      axios
        .patch(
          `https://bookeriaapi-4c4e83f96829.herokuapp.com/api/cart/delete/${id}/${product.productId._id}`
        )
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(delCart(product));
    }
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 99.0;
    let totalItems = 0;
    if (id) {
      items.map((item) => {
        return (subtotal += item.productId.price * item.quantity);
      });
    } else {
      items.map((item) => {
        return (subtotal += item.price * item.qty);
      });
    }
    if (id) {
      items.map((item) => {
        return (totalItems += item.quantity);
      });
    } else {
      items.map((item) => {
        return (totalItems += item.qty);
      });
    }
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {items.map((item) => {
                      let imageUrl;
                      if (id) {
                        imageUrl = `https://bookeriaapi-4c4e83f96829.herokuapp.com/api/books/images/${item.productId.image}`;
                      } else {
                        imageUrl = `https://bookeriaapi-4c4e83f96829.herokuapp.com/api/books/images/${item.image}`;
                      }
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light">
                                <img
                                  src={imageUrl}
                                  // className="w-100"
                                  alt={imageUrl}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                {id ? (
                                  <strong>{item.productId.name}</strong>
                                ) : (
                                  <strong>{item.name}</strong>
                                )}
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}>
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    removeItem(item);
                                  }}>
                                  <i className="fas fa-minus"></i>
                                </button>
                                {id ? (
                                  <p className="mx-5">{item.quantity}</p>
                                ) : (
                                  <p className="mx-5">{item.qty}</p>
                                )}
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}>
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                {id ? (
                                  <strong>
                                    <span className="text-muted">
                                      {item.quantity}
                                    </span>{" "}
                                    x {item.productId.price}
                                  </strong>
                                ) : (
                                  <strong>
                                    <span className="text-muted">
                                      {item.qty}
                                    </span>{" "}
                                    x {item.price}
                                  </strong>
                                )}
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})
                        <span>{Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>{shipping} </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>
                    {!id ? (
                      <p style={{ color: "red", fontSize: 18 }}>
                        Please login first
                      </p>
                    ) : (
                      ""
                    )}
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      disabled={id ? false : true}
                      onClick={(e) => {
                        e.preventDefault();
                        if (id) {
                          window.location.href = "/checkout";
                        }
                      }}>
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {items.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
