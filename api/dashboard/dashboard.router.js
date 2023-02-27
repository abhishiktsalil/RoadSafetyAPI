const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getAllRequests } = require("./dashboard.service");

router.get("/", getAllRequests);

module.exports = router;