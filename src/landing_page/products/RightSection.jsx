import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore}>Learn More</a>
          </div>
        </div>
        <div className="col-6">
          <img src={imageURL} 
          style={{ 
              maxWidth: "100%", 
              width: "80%", // You can adjust this percentage (e.g., 60%, 70%) to your preference
              height: "80%",
              borderRadius: "20px",
              marginLeft: "15px",
            }}/>
        </div>
      </div>
    </div>
  );
}

export default RightSection;