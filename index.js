require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require ('cors')
const  connectDB  = require('./config/db.js');
const apiRouter = require('./routes/index.js');

const app = express()
const port = process.env.PORT ; 
connectDB();
app.use(cors({
  origin: 'https://capstone-project-online-food-delivery-yummy-client.vercel.app', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use("/api", apiRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
