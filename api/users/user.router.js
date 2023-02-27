//const cors = require('cors');
const { createUser,getUserList,getUserById, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUserList);
router.get("/:id", checkToken, getUserById);
router.post("/login", login);

module.exports = router;