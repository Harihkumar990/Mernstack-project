const express = require("express");
const admincontroller = require("../controllers/admi-controller");
const adminrouter = express.Router();


adminrouter.route("/user").get(admincontroller.userscontroller);

adminrouter.route("/contacts").get(admincontroller.contactscontrolller);

adminrouter.route("/userdelete/:id").delete(admincontroller.delteuser);

adminrouter.route("/user/update/:id").patch(admincontroller.updateuserdata);

adminrouter.route("/user/contact/delete/:id").delete(admincontroller.contatdelete);

adminrouter.route("/user/contact/update/:id").patch(admincontroller.updatecontactdata)

module.exports = adminrouter;