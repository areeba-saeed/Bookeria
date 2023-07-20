import React from "react";
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to our Bookstore! We are dedicated to bringing you the best
          selection of books for all ages and interests. Whether you're looking
          for fiction or non-fiction, a thrilling mystery or a heartwarming
          romance, we've got something for everyone. Our friendly staff is
          always ready to assist you in finding your next great read. Come on
          in, explore the shelves, and immerse yourself in the wonderful world
          of books! Happy reading!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
