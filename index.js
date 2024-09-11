require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require ('cors')
const  connectDB  = require('./config/db.js');
const apiRouter = require('./routes/index.js');

const app = express()
const port = process.env.PORT ||3000;
connectDB();

const corsOptions = {
  origin: [
    'http://localhost:5173', // for local development
    'https://capstone-project-online-food-delivery-yummy-client.vercel.app' // for production
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})