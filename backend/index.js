require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const crypto = require("crypto");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Simple helper to hash passwords (for demo purposes; not production‑grade)
const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

// ---------- Auth routes ----------

app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new UserModel({
      email,
      passwordHash: hashPassword(password),
    });

    await user.save();

    res.json({
      message: "Signup successful",
      email: user.email,
    });
  } catch (err) {
    console.error("Error in /auth/signup", err);
    res.status(500).json({ error: "Failed to signup" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const incomingHash = hashPassword(password);
    if (incomingHash !== user.passwordHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Very simple token (for demo only); you can replace with JWT later
    const token = Buffer.from(`${user._id}:${user.email}`).toString("base64");

    res.json({
      message: "Login successful",
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Error in /auth/login", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    console.error("Error fetching orders", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // 1. Save the order as a separate row (each BUY/SELL is its own document)
    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });
    await newOrder.save();

    // 2. Update holdings based on the order
    const quantity = Number(qty);
    const tradePrice = Number(price);

    if (mode === "BUY") {
      // Increase or create holding
      const existing = await HoldingsModel.findOne({ name });

      if (existing) {
        const oldQty = existing.qty || 0;
        const newQty = oldQty + quantity;

        // Simple average price recalculation
        const oldAvg = existing.avg || 0;
        const newAvg =
          oldQty + quantity > 0
            ? (oldAvg * oldQty + tradePrice * quantity) / (oldQty + quantity)
            : tradePrice;

        existing.qty = newQty;
        existing.avg = newAvg;
        existing.price = tradePrice;
        await existing.save();
      } else {
        // Create a new holding document for this stock
        const newHolding = new HoldingsModel({
          name,
          qty: quantity,
          avg: tradePrice,
          price: tradePrice,
          net: "0.00%",
          day: "0.00%",
        });
        await newHolding.save();
      }
    } else if (mode === "SELL") {
      // Decrease holding quantity
      const existing = await HoldingsModel.findOne({ name });

      if (existing) {
        const oldQty = existing.qty || 0;
        const newQty = oldQty - quantity;

        if (newQty <= 0) {
          // Remove holding completely if nothing left
          await HoldingsModel.deleteOne({ _id: existing._id });
        } else {
          existing.qty = newQty;
          // Keep avg/price as-is or update last traded price
          existing.price = tradePrice;
          await existing.save();
        }
      }
    }

    res.send("Order saved!");
  } catch (err) {
    console.error("Error saving order", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.log("Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

app.listen(PORT, () => {
  console.log(`Backend server started on port ${PORT}!`);
  connectDB();
});