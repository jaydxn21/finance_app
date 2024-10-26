const auth = require("../controllers/auth.controller.js");
var router = require("express").Router();

router.post(
  "/register",
  cors({ origin: "https://fnce.onrender.com" }),
  auth.register
);
router.post("/login", auth.login);
router.get("/", auth.get);

module.exports = router;
