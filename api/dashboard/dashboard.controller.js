const { getAllRequests } = require("./dashboard.service");

module.exports = {
    getRequests:(req, res)=>{
        getAllRequests((err, results)=>{
            if(err){
                console.log(err);
                return res.status(err.code).json({
                    success:0,
                    message:"Database connection error : "+ err.message
                });
            }
            return res.status(200).json({
                success:1,
                message: results
            });
        });
    },
    
};