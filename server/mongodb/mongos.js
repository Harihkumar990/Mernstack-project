const MongoDb =  require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_db";

const URI = process.env.MONGOURI;
const connectDB =async () =>{
    try{
        await MongoDb.connect(URI);
    }catch(error){
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDB;