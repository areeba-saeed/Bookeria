import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Checkout = () => {
  const savedState = useSelector((savedState) => savedState.handleCart);
  const id = localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [creditNumber, setcreditNumber] = useState("");
  const [expiration, setexpiration] = useState("");
  const [save, setSave] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [totalPrice, settotalPrice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://protected-plateau-82492-26f0113d64bb.herokuapp.com/api/orders/checkout/${id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`https://protected-plateau-82492-26f0113d64bb.herokuapp.com/api/user/${id}`)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setCountry(response.data.country);
          setAddress(response.data.address);
          setZip(response.data.zip);
          setAddress2(response.data.address2);
          setState(response.data.state);
          setSave(response.data.save);
          setCvv(response.data.cvv);
          setexpiration(response.data.expiration);
          setcreditNumber(response.data.creditNumber);
          setNameOnCard(response.data.nameOnCard);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setItems(savedState);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      const data = {
        userId: id,
        name: name,
        email: email,
        items: items,
        cvv,
        nameOnCard,
        expiration,
        creditNumber,
        save,
        country,
        state,
        zip,
        address,
        address2,
        totalPrice,
      };
      axios
        .post("https://protected-plateau-82492-26f0113d64bb.herokuapp.com/api/orders", data)
        .then((response) => {
          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/");
      }, 1000);
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 99;
    let totalItems = 0;
    if (id) {
      items.map((item) => {
        return (subtotal += item.price * item.quantity);
      });
    } else {
      items.map((item) => {
        return (subtotal += item.price * item.qty);
      });
    }
    settotalPrice(subtotal + shipping);

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
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})<span>{Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>{shipping}</span>
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
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-12 my-1">
                        <label className="form-label">Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          readOnly
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="1234 Main St"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                      <div className="col-12">
                        <label for="address2" className="form-label">
                          Address 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={address2}
                          onChange={(e) => setAddress2(e.target.value)}
                          className="form-control"
                          id="address2"
                          placeholder="Apartment or suite"
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required>
                          <option value="">Choose...</option>
                          <option value="Pakistan">Pakistan</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label for="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required>
                          <option value="">Choose...</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="KPK">KPK</option>
                          <option value="Balochistan">Balochistan</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    <div className="col gy-3 d-flex justify-content-between">
                      <h4 className="mb-3">Payment</h4>
                    </div>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label for="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label for="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                          value={creditNumber}
                          onChange={(e) => setcreditNumber(e.target.value)}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          value={expiration}
                          onChange={(e) => setexpiration(e.target.value)}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label for="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                    {successMessage ? (
                      <p className="text-center" style={{ color: "green" }}>
                        Order placed
                      </p>
                    ) : (
                      ""
                    )}
                    <button className="w-100 btn btn-primary " type="submit">
                      Continue to checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {items.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
