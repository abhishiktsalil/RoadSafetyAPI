const pool = require("../../config/database");

module.exports = {
  getAllRequests: (data, callback) => {
    pool.query(
      "insert into tbl_user_details(v_firstname,v_lastname,v_aadhaar_no,e_is_aadhaar_verified,v_dl,e_is_dl_verified,e_role,d_dob," +
        "v_contactno,v_emergency_contact_no,v_emergency_contact_name,v_email_LoginID,e_is_email_verified,v_password,d_createdDatetime)" +
        " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.firstname,
        data.lastname,
        data.aadhaar_no,
        data.is_aadhaar_verified,
        data.dl,
        data.is_dl_verified,
        data.role,
        data.dob,
        data.contactno,
        data.emergency_contact_no,
        data.emergency_contact_name,
        data.email_LoginID,
        data.is_email_verified,
        data.password,
        data.createdDatetime,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  
};
