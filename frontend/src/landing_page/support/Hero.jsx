import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      
      <div className="p-5" id="supportWrapper">
        <h4>Support Portal</h4>
        <a href="" className="fs-5">Track Tickets</a>
      </div>

      
      <div className="row p-5" id="contentWrapper">
        <div className="col-7 px-5">
          <h1 className="fs-3 mb-4">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <div className="search-container mb-4">
            <input placeholder="Eg: how do I activate F&O, help with account" />
          </div>
          <div className="hero-links">
            <a href="">Track account opening</a>
            <a href="">Track segment activation</a>
            <a href="">Intraday margins</a>
            <a href="">Kite user manual</a>
          </div>
        </div>
        
        <div className="col-5 px-5">
          <h1 className="fs-3 mb-4">Featured</h1>
          <ol>
            <li className="mb-3">
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;