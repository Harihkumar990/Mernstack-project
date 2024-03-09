require("dotenv").config();
const express = require("express");
const router = require("./router/router-auth");
const mongoDB = require("./mongodb/mongos");
const Error = require("./middleware/error-middleware");
const cors = require("cors");
const servicerouter = require("./router/service-route");
const adminrouter = require("./router/admin-router")
var corsOptions = {
    origin:'http://localhost:3000',
    methods:"GET,POST, PUT, DELETE, PATCH , HEAD",
    credentials:true,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api",router);
app.use("/products",servicerouter);
app.use("/admin",adminrouter)

app.use(Error);
const port = 5000;

mongoDB().then(()=>{
    app.listen(port,()=>{
        console.log(`The server run at port ${port}`);
    })
})