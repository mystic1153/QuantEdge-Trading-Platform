import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/profile.png"
            style={{ borderRadius: "100%", width: "30%" }}
          />
          <h4 className="mt-0">Yug Patel</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Yug bootstrapped and founded QuantEdge in 2025 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            QuantEdge has changed the landscape of the Indian broking industry.
          </p>
          
          
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;