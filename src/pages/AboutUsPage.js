import React from "react";
import { Link } from "react-router-dom";

//pictures
import pic1 from "../assets/images/about/pic1.png";
import pic2 from "../assets/images/about/pic2.png";
import pic3 from "../assets/images/about/pic3.png";
import pic4 from "../assets/images/about/pic4.png";

const AboutUsPage = () => {
  return (
    <div className="w-screen h-auto absolute top-0 left-0 right-0">
      <div className="w-full h-screen pt-12 background-1 bg-black relative">
        <div className=" w-96 h-auto flex items-center flex-col absolute top-1/4 left-1/2 transform-center">
          <h1 className="text-white text-7xl font-semibold text-shadow">
            MI CASA
          </h1>
          <hr className="w-full mt-2 mb-2" />
          <p className="text-white text-3xl text-shadow">Since 2000</p>
        </div>
        <div className="w-2/4 absolute bottom-1/4 left-1/2 transform-center">
          <p className="text-white text-2xl text-shadow text-center">
            Mi Casa is one of the Thailand's leading independent Estate Agents
            with over 10,000+ properties in Bangkok on our websites.
          </p>
          <p className="text-white text-2xl text-shadow text-center">
            The Mi Casa's Group also comprises of the specialists mortgage and
            insurance advisers, Life Financial Services.
          </p>
        </div>
      </div>
      <div className="w-full h-auto p-20 bg-black text-white">
        <div className="w-full pl-5 pr-5 2xl:w-3/4 1xl:p-0 h-full mx-auto">
          <div className="w-full flex items-center mb-12">
            <img
              src={pic1}
              alt=""
              className="w-2/5 mr-24 flex-shrink-0 flex-grow-0"
            />
            <div className="w-full flex flex-col items-end">
              <h1 className="text-2xl mb-5">
                Thinking of selling your property?
              </h1>
              <p className="text-lg text-justify">
                Mi Casa have teams of local exports across a wide geographical
                network who work with you to secure the maximum sales price for
                your property, within a time frame that suit your needs.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row-reverse items-center mb-12">
            <img
              src={pic2}
              alt=""
              className="w-2/5 ml-24 flex-shrink-0 flex-grow-0"
            />
            <div className="w-full flex flex-col items-end">
              <h1 className="text-2xl mb-5">
                Why use Mi Casa to find a home to buy?
              </h1>
              <p className="text-lg text-justify">
                Whether buying a home for you and your family, or as an
                investment, we work with you to find your ideal property to buy.
              </p>
            </div>
          </div>
          <div className="w-full flex items-center mb-12">
            <img
              src={pic3}
              alt=""
              className="w-2/5 mr-24 flex-shrink-0 flex-grow-0"
            />
            <div className="w-full flex flex-col items-end">
              <h1 className="text-2xl mb-5">
                Why use Mi Casa to find a home to rent?
              </h1>
              <p className="text-lg text-justify">
                Mi Casa work with tenants to make renting as simple and
                stress-free as possible.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row-reverse items-center mb-12">
            <img
              src={pic4}
              alt=""
              className="w-2/5 ml-24 flex-shrink-0 flex-grow-0"
            />
            <div className="w-full flex flex-col items-end">
              <h1 className="text-2xl mb-5">
                Why use Mi Casa to sell your home?
              </h1>
              <p className="text-lg text-justify">
                We aim to achieve the best rate for your property in a timescale
                that suit you with a suitable tenant.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen pt-12 background-3 bg-black relative">
        <div className=" w-96 h-auto flex items-center flex-col absolute top-1/4 left-1/2 transform-center">
          <h1 className="text-white text-4xl font-semibold text-shadow mb-5">
            Join us today
          </h1>
          <Link
            to="/signup"
            className="flex items-center justify-center w-80 h-10 rounded-xl text-white bg-blue-500 text-lg font-normal align-middle hover:bg-opacity-90 ease-in duration-75"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
