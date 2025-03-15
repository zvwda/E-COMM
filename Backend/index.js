
const port = 4000;
const express = require("express");
const app = express();

const connectToDb = require("./config/Connect_to_DB");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");//just to deal with images 
const path = require("path");
const cors = require("cors");
const { log } = require("console");


app.use(express.json());
app.use(cors());

// Database connection with mongodp
//mongoose.connect("mongodb+srv://zwalid327:01221579083@cluster0.8hicg.mongodb.net/e-commerce");
//connecion to Db
connectToDb();


// API Creation 
app.get("/",(req , res)=>{
        res.send("Express App is Running")
})
//---------------------------------------------------------------------------------------------------
// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req , file , cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 
const upload = multer({storage:storage})

//creating Upload endpoint for images
app.use('/images' , express.static('upload/images'))

app.post("/upload" , upload.single('product'),(req,res)=> {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for Creationg Products 
const products = mongoose.model("Product" , {
    id: {
        type: Number,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required : true,
    },
    new_price:{
        type:Number ,
        required: true ,
    },
    old_price:{
        type: Number ,
        required:true,
    },
    date:{
        type : Date,
        default:Date.now,
    },
    available :{
        type : Boolean,
        default:true,
    },
})

//schema for creating User Model
const User = mongoose.model('Users' , {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date: {
        type: Date, 
        default: Date.now,
    }
})

//creating end points for registring the users
app.post('/signup',async(req , res)=>{
    console.log("done1")

    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"this user found before"})
    }
    let cart = {};
    for (let i = 0 ; i < 300 ; i++){
           cart[i] =0;
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        cartData:cart,
    })
    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true , token})
    console.log("done")
})

//creating end poin for user login
app.post('/login' , async(req, res)=> {
    let user = await User.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const Data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(Data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false, errors: "wrong password"});
        }
    }
    else{
        res.json({success:false, errors: "wrong Email Id"});

    }
})



app.post('/addproduct' , async (req,res)=>{
    let Products = await products.find().sort({ id: -1 }).limit(1); 
    let id = (Products.length > 0 && !isNaN(Products[0].id)) ? Products[0].id + 1 : 1;

    const product = new products({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating API for deleting Products 
app.post('/removeproduct' , async(req , res)=> {
    await products.findOneAndDelete({id:req.body.id});
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name 
    })
}) 

//Creating API for get all products
app.get('/allProducts' , async(req,res)=>{
    let product = await products.find({});
    console.log("all products fetched");
    res.send(product);
})

//creating end point for new collection
app.get('/newCollection' , async(req,res)=>{
    let product = await products.find({});
    let newcollection = product.slice(1).slice(-8);
    console.log("new collections fetched");
    res.send(newcollection);
})

//creating end point for new collection
app.get('/popular' , async(req,res)=>{
    let product = await products.find({});
    let popular = product.slice(0,4)
    console.log("poular fetched");
    res.send(popular);
})


//creating meddleware to fetch user 
const ferchuser = async(req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please login First"});
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"please login First"});
        }
    }
}

//creating endpoint for adding products in cartdata
app.post('/addtocart',ferchuser,async(req,res)=>{
    console.log(req.body , req.user);
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});

    res.send("Added");
})


//creating endpoint for remove products from cartdata
app.post('/removetocart',ferchuser,async(req,res)=>{
    console.log(req.body , req.user);
    let userData = await User.findOne({_id:req.user.id});
   
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id: req.user.id},{cartData:userData.cartData});
    res.send("remove");
})

//creating end point to get cartdata
app.post('/getcart' , ferchuser , async(req,res)=>{
    console.log("GetCart");
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port , (error)=> {
    if(!error){
        console.log("server Running on Port "+port);
    }
    else{
        console.log("Error : "+error)
    }
});

