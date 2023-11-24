const jwt = require('jsonwebtoken');
const JWT_SECRET = "keertheshwaran@123";


const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send("Tocken is Not Valid");
    }
    try {
        const jwtverification = jwt.verify(token, JWT_SECRET)
        req.user = jwtverification.user
        next();
    } catch (error) {
        res.status(401).send("Users not found with this Tokens");
    }
}


module.exports = fetchuser