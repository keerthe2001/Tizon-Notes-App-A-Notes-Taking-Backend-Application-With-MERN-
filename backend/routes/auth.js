const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser')

const JWT_SECRET = "keertheshwaran@123";

// ROUTE1 -  Handle POST requests to create and save a user
router.post('/createUser', [
    body('name','Enter a Name with length Min 3').isLength({min:5}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter a Password with length Min 3').isLength({min:5})
] ,async(req, res) => {
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try{

  const uservalidation = await User.findOne({email: req.body.email})

  if(uservalidation){
      return  res.json({error:"User already Exist, Please Try another!!" })
  }

  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password,salt)
  
  user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass,
  });
  const data = {
    user:{
        id:user.id
    }
  }

  const authtoken = jwt.sign(data,JWT_SECRET)
    res.json({authtoken: authtoken}) 
      user.save()
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
  // Create a new User instance with data from the request body
});

// Authentication of the created User 

//  ROUTE - 2 -  Handle POST requests to Login AND authenticate a user using tocken jwt
router.post('/login', [
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter a Password with length Min 3').isLength({min:5})
] ,async(req, res) => {

    // Checking if the req input is validated correctly
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const {email, password} = req.body;
    try{
    const user = await User.findOne({email})

    if(!user)
    {
       return res.status(400).json({error: "Enter the credentials correctly"})
    }

    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword)
    {
      return res.status(400).json({error: "Enter the credentials correctly"})
    }

    const data = {
        user:{
            id:user.id
        }
      }
    
      const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken: authtoken}) 
    }
    catch(error)
    {
        res.send(error.message)
    }
})

//  ROUTE - 3 -  Handle and Get User Data to display
router.post('/getuser', fetchuser ,async(req, res) => {
    try {
      userid = req.user.id;
      const userData = await User.findById(userid).select('-password');
      res.send(userData);
    } catch (error) {
      return res.status(500).send("User Details Not Found!")
    }
  })
//  ROUTE - 3 -  Handle and Get User Data to display
router.post('/summa',async(req, res) => {
      return res.status(500).send("User Details Found!")
  });
module.exports = router;
