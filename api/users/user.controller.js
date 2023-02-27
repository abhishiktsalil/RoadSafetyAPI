require("dotenv").config();
const {
  create,
  getUsers,
  getUserById,
  getUserByEmailId,
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        //console.log(err);
        return res.status(500).json({ success: 0, message: "Database " + err });
      }
      return res.status(200).json({ success: 1, message: results });
    });
  },
  getUserList: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error:" + err,
        });
      } 
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({ success: 0, message: "0 record(s) found" });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmailId(body.email_LoginID, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (!results) {                
        return res.json({ success: 0, data: "Invalid email or password" });
      }      

      const result = compareSync(body.password, results.v_password);
      
      if (result) {        
        results.password = undefined; //remove password from results before returning results object as token.
        const jsontoken = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfull",
          token: jsontoken,
        });
      } else {
        return res.json({ success: 0, data: "Invalid email or password" });
      }
    });
  },
};
