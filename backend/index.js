const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// ---------- MIDDLEWARE ----------
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS setup
const allowedOrigins = [
  "https://style-ecom-frontend.vercel.app", // Production frontend
  "http://localhost:5173"                    // Local frontend (Vite dev server)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies
  })
);

// ---------- IMAGE UPLOAD ----------
const uploadImage = require("./src/utils/uploadImage");

app.post("/uploadImage", async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: "Image is missing" });
    }

    const url = await uploadImage(req.body.image);
    return res.json({ url });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// ---------- ROUTES ----------
const authRoutes = require("./src/users/user.route");
const productsRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.router");
const orderRoutes = require("./src/orders/orders.route");
const statsRoutes = require("./src/stats/stats.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

// ---------- DATABASE & SERVER ----------
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");

    app.get("/", (req, res) => {
      res.send("Style E-commerce Server is running....!");
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
