const Servicemodal = require("../mongose_schema/service-schema");

const servicecontroller  =  async (req,res,next) =>{

    try {
        const data = await Servicemodal.find();
        if(!data){
            return res.status(500).json({msg:"Data not found"})
        }
        res.status(200).json({data});
    } catch (err) {
        console.log(err)
    }
}

module.exports = servicecontroller;