
const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
function validateToken(token){
   try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return {success : true,data:decoded};
   }catch(e){
    return {success : false,error:e.message};
   }
}

function authenticateToken(req,res,next){
    const token = req.headers['authorization']
    if(!token) return res.sendStatus(401);
    const result = validateToken(token);
    if(!result.success){
        return res.status(403).json({error:result.error})
    }
    next();
}

module.exports = {authenticateToken};