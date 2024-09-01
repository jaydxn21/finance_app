const auth = require("../controllers/auth.controller.js");
var router = require("express").Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/", auth.get);

module.exports = router;
