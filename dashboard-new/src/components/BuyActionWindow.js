import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [currentHoldingQty, setCurrentHoldingQty] = useState(0);
  const generalContext = useContext(GeneralContext);

  // Fetch current holding for this stock so we can validate SELL orders
  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        const holding = res.data.find((item) => item.name === uid);
        setCurrentHoldingQty(holding ? holding.qty : 0);
      })
      .catch((err) => {
        console.error("Failed to fetch holdings", err);
        setCurrentHoldingQty(0);
      });
  }, [uid]);

  const handleBuyClick = () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity to buy.");
      return;
    }

    axios
      .post("http://localhost:3002/newOrder", {
        name: uid,
        qty,
        price,
        mode: "BUY",
      })
      .then(() => {
        // Optimistically update local holding quantity for this stock
        setCurrentHoldingQty((prev) => prev + qty);
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        console.error("Failed to place BUY order", err);
        alert("Failed to place BUY order. Please try again.");
      });
  };

  const handleSellClick = () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!qty || qty <= 0) {
      alert("Please enter a valid quantity to sell.");
      return;
    }

    if (currentHoldingQty < qty) {
      alert(
        `You only have ${currentHoldingQty} shares in holdings. Adjust the quantity or buy more before selling.`
      );
      return;
    }

    axios
      .post("http://localhost:3002/newOrder", {
        name: uid,
        qty,
        price,
        mode: "SELL",
      })
      .then(() => {
        // Optimistically update local holding quantity after SELL
        setCurrentHoldingQty((prev) => prev - qty);
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        console.error("Failed to place SELL order", err);
        alert("Failed to place SELL order. Please try again.");
      });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;