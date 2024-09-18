require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require ('cors')
const  connectDB  = require('./config/db.js');
const apiRouter = require('./routes/index.js');

const app = express()
const port = process.env.PORT ||3000;
connectDB();
const allowedOrigins = [
  'http://localhost:5173',
  'https://capstone-project-online-food-delivery-yummy-client-bx55x1x53.vercel.app/'
];

// CORS options configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));


app.use(express.json())
app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})