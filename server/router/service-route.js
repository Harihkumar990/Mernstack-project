const express = require("express");
const servicecontroller = require("../controllers/service-conroller");
const servicerouter = express.Router();

servicerouter.route("/service").get(servicecontroller);


module.exports = servicerouter;