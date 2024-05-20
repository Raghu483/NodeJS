
const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
function validateToken(req,res){
    const token = req.headers['authorization']
    if(!token) return false;
   try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return true;
   }catch(e){
        return false;
   }
    return false;
}

module.exports = {validateToken};