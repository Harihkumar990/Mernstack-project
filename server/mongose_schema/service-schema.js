const {Schema,modal, model} = require("mongoose");


const ServiceSchema = new Schema({
    image:{type:String, require:true},
    title:{type:String, require:true},
    start_production:{type:Number, require:true},
    class:{type:String, require:true}

})


const Servicemodal = new model("Service",ServiceSchema);

module.exports = Servicemodal;
