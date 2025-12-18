import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5 mt-5" style={{
          background: "linear-gradient(180deg, #000000ff 100%, #ffffff 100%)", 
          borderRadius: "30px"
        }}>
      <div className="row text-center" >
        <img
          src="media/images/homeHero.png"
          alt="Hero Image"
          className="mb-5"
          style={{ 
            width: "100%", 
            height: "auto",
            // ADDED: Apply border radius to the image itself 
            borderRadius: "30px" 
          }}
        />
        <h1 className="mt-5 text-white">Invest in everything</h1>
        <p className="text-white">
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;