//Cross Origin Resource Sharing
const whitelist=[
    'http://167.71.228.167:9000',    
    'http://127.0.0.1:3000',
    'http://localhost:3000'
];


const corsOptions = {
  origin: (origin, callback)=>{
    //console.log(origin);
    if(whitelist.indexOf(origin)!==-1 || !origin){
      callback(null, true);
    }else{
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = corsOptions;