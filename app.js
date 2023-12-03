

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/Sample", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected with MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = new mongoose.model("Product", productSchema);

// ccreate product API

app.post('/api/v1/product/new', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});
// read product 
app.get('/api/v1/products', async(req,res)=>{
  try{
    const products = await Product.find()
    res.status(200).json({
      success:true,
      products
    })

  }
  catch{
    res.status(500).json({
      success: false,
      message: 'Error fetching  products'
    });

  }

}) 
app.put('/api/v1/product/:id', async(req,res)=>{
  try{
    let product = await Product.findById(req.params.id)
    if(!product){
      res.status(500).json({
        success:false,
        message:"Product is not found"
      })
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
      useFindAndModify:true,
      runValidators:true})
    res.status(200).json({
      success:true,
      product
    })

  }
  catch{
    res.status(500).json({
      success: false,
      message: 'Error updating  product'
    });

  }

}) 
app.delete('/api/v1/product/:id', async(req,res)=>{
  try{
     const product = await Product.findByIdAndRemove(req.params.id)
    if(!product){
     return res.status(404).json({
        success:false,
        message:"Product is not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Product is deleted succefully"
    })
    // await Product.findByIdAndRemove(req.params.id);
    // res.status(200).json({
    //   success:true,
    //   message:"Product is deleted succefully"
    // })

  }

  
  catch(error)
  {
    res.status(500).json({
      success: false,
      message: 'Error deleting a  product'
    });

  }

}) 

app.listen(4500, () => {
  console.log('Server is working at http://localhost:4500');
})
 