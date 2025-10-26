const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000;


// middleware setup
app.use(express.json({limit: "25mb"}));
// app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: 'https://style-ecom-frontend.vercel.app/',
    credentials: true,
  })
);

//image upload
const uploadImage = require('./src/utils/uploadImage')

app.post("/uploadImage", async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ error: "Image is missing" });
    }

    const url = await uploadImage(req.body.image);
    return res.json(url);

  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
});


// All routes
const authRoutes = require('./src/users/user.route');
const productsRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router')
const orderRoutes = require('./src/orders/orders.route')
const statsRoutes = require('./src/stats/stats.route')

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/stats', statsRoutes)


main()
  .then(() => console.log("mongodb is successfully connected."))
  .catch((err) => console.log(err));

  async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Style E-commerce Server is running....!");
  });
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

