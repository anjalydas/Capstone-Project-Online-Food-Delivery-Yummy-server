require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require ('cors')
const  connectDB  = require('./config/db.js');
const apiRouter = require('./routes/index.js');

const app = express()
const port = process.env.PORT || 3000; 
connectDB();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Add methods you want to allow
  credentials: true // If you need to send cookies or other credentials
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