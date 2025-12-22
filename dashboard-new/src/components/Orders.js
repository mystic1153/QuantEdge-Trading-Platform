import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load all orders from backend; each BUY/SELL created via /newOrder should appear here
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
        setOrders([]);
      });
  }, []);

  if (!orders.length) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Side</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                {/* assuming backend returns same fields we send in /newOrder plus maybe timestamp */}
                <td>{order.name}</td>
                <td>{order.mode}</td>
                <td>{order.qty}</td>
                <td>{Number(order.price).toFixed(2)}</td>
                <td>{order.time || order.createdAt || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;