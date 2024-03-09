
const Middleware = (validation) => async (req,res,next) =>{
    try{
        const parseBody = await validation.parseAsync(req.body);
        req.body = parseBody;

        next();
    }catch(err){
        const error = {
            status:450,
            message:err.errors[0].message
        }
        next(error);
    }
};


module.exports = Middleware;