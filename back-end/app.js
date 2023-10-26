const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const router = require('./routes/router')
// Create Express app
const app = express();
//Configs
env.config();
//MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));

const corsOptions = {
    origin: Object.values(JSON.parse(process.env.CORS_ALLOWED_URLS)),
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
  app.disable("x-powered-by");

  // Routes
   app.use('/api',router)
  // Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;