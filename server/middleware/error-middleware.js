const Error = (err,req,res,next) =>{
    const status = err.status || 500
    const message = err.message || "Backend error"
    const Extra_details = err.Extra || "From the developer side"

    return res.status(status).json({message,Extra_details});
}

module.exports = Error;