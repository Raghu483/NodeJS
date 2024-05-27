const express = require("express");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const eventController= require("../controllers/eventController").getEvents;
const router = express.Router();
const app = express();

router.use("/users/signup", registerController);
router.use("/users/login", loginController);
//router.get("/events", getEvents);
app.get("/events",eventController)

module.exports = router;