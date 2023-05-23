import express from "express"
import ProductManager from "./ProductManager.js"

const app = express ()
const productManager = new ProductManager (`./productos.json` , `utf-8`)

app.listen(8080 , ()=> console.log("Server Up"))

app.get (`/Products` ,async (req , res)=>{
    const limit = req.query.limit
    const pid = req.query.pid
    let products = await productManager.getProducts()
    if(limit>0){
        const productsWlimit = []
        for (let index = 0; index <= limit-1; index++) productsWlimit.push (products[index]);   
        res.send(productsWlimit)
    }
    if (pid!=undefined){
        let searchProduct = await  productManager.getPruductsByid(pid)
        if (!searchProduct ) res.send (`no se encuentra el producto`)
        else res.json (searchProduct)
    }
    if (limit === undefined && !pid ) res.send(products)
})

