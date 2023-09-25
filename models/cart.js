const fs=require('fs');
const path=require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart{
    static addProduct(id, productPrice){
        //fetch the previous cart
        fs.readFile(p,(err,fileContent) => {
            let cart= {products: [], totalPrice: 0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
            //Analyze the cart => Find existing product
            const existingProductIndex=cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products.find(prod => prod.id ===id);
            let updatedProduct;
            if(existingProduct){

                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty +1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex] = updatedProduct;

            }else{
                updatedProduct={id:id, qty:1};
                cart.products=[...cart.products,updatedProduct];
            }

            cart.totalPrice=(parseInt(cart.totalPrice) + parseInt(productPrice));
            fs.writeFile(p,JSON.stringify(cart),err => {
                console.log(err);
            })
        });
    }
//deleting the cart item that were deleted 
    static deleteProduct(id, productPrice){
        fs.readFile(p,(err,fileContent) => {
            if(err){
                return;
            }
            const updateCart={...JSON.parse(fileContent)};
            const product= updateCart.products.find(prod => prod.id ===id);
            const productQty=product.qty;
            console.log(productQty);
            updateCart.products=updateCart.products.filter(prod => prod.id !== id);
            updateCart.totalPrice= updateCart.totalPrice - productPrice*productQty;

            fs.writeFile(p,JSON.stringify(updateCart),err => {
                console.log(err);
            });
        });
    
    }


    static getCart(cb){
        fs.readFile(p,(err,fileContent) => {
            const cart=JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
            });
    }
}

