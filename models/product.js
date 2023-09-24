const path = require('path');
const fs = require('fs');

const Cart=require('./cart');

const p = path.join(path.dirname(require.main.filename),
    'data',
    'products.json'
);

//const products = [];

//helper function
const getProductsFromFile = cb => {
    var json;
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            json = JSON.parse(fileContent);
            cb(json);
        }
    });
};


module.exports = class Products {
    constructor(id,title,imageUrl,description,price) {
        this.id=id;
        this.title = title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
        

    }

    save() {
        // products.push(this)

        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(

                    prod => prod.id === this.id
                );
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                });

            } else {

                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }

        });
    }


    static fetchAll(cb) {

        getProductsFromFile(cb);



    }


    //Deleting Products

    static deleteById(id){

        getProductsFromFile(products =>{
            const product= products.find(prod => prod.id === id);
            const updateProduct=products.filter(prod => prod.id !== id);
            console.log("reached del p1");
            fs.writeFile(p,JSON.stringify(updateProduct),err =>{
                if(!err){
                    Cart.deleteProduct(id,product.price);
                }
            });
        });
        
    }

    static findById(id,cb){
        getProductsFromFile(products =>{
            const product=products.find(p => p.id==id);
            cb(product);
        });
    }
}