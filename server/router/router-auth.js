const express = require("express");
const Middleware = require("../middleware/validator-middleware");
const schema = require("../Validator/Validation-mern");
const autcontrol = require("../controllers/controller");
const verifyjwtToken = require("../middleware/auth-middleware");

const router = express.Router();

router.route("/").get(autcontrol.home);

router.route("/signup").post(Middleware(schema.validation_signup),autcontrol.signup);

router.route("/login").post(Middleware(schema.validation_login),autcontrol.login);

router.route("/contact").post(Middleware(schema.validation_contact),autcontrol.contact);

router.route("/user").get(verifyjwtToken,autcontrol.user)
module.exports = router;