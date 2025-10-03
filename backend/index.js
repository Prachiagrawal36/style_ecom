const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000

//npm run start:dev

//middleware setup
app.use(express.json({limit: "25mb"}));
// app.use(express.urlencoded({extended: true, limit: "25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//all routes
const authRoutes = require('./src/users/user.route')

app.use('/api/auth', authRoutes);


main()
.then(()=> console.log("MongoDB is successfully Connected..."))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get('/', (req, res) => {
  res.send('Style Ecommerce is running...!')
});

}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

