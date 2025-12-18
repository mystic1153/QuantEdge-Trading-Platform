import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

import Navbar from "../Navbar";
import Footer from "../Footer";

function PricingPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="media/images/quantinvest.png"
        productName="QuantEdge Invest"
        productDesription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the QuantEdge Invest experience seamlessly on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      <RightSection
        imageURL="media/images/quantalgo.png"
        productName="QuantEdge Algo"
        productDesription="The central dashboard for your QuantEdge account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnMore=""
      />
      <LeftSection
        imageURL="media/images/quantfunds.png"
        productName="QuantEdge Funds"
        productDesription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        tryDemo=""
        learnMore=""
        googlePlay=""
        appStore=""
      />
      
      <p className="text-center mt-5 mb-5">
        Want to know more about our technology stack? Check out the QuantEdge.tech
        blog.
      </p>
      <Universe />
    </>
  );
}

export default PricingPage;