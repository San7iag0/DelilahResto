const express = require('express');
const server = express();

//ENP created a product
server.post("/products/add", validateUser, (req, res) => {
    if(req.body.user.admin == true){
      let{name, price, code} = req.body;
      addProduct(name, price, code);
      res.status(200).json({message: "Product added successfully", list: products})
    }else {
      res.status(401).json({message: "No Authorize"})
    }
    
  
  });
  
  // ENP get list of Products 
  server.get("/products", (req, res) => {
    res.json(products);
    res.status(200);
  })