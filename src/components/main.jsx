import React from "react";
import Banner from "../assets/Untitled design.png";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src={Banner}
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                Explore Our Book Collection
              </h5>
              <p className="card-text fs-5 d-none d-sm-block">
                Immerse Yourself in a World of Stories and Knowledge. Discover
                New Titles, Bestsellers, and Hidden Gems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
