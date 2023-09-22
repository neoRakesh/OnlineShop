const path = require('path');
const fs = require('fs');

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
    })
}


module.exports = class Products {
    constructor(title,imageUrl,price,description) {
        this.title = title;
        this.imageUrl=imageUrl;
        this.price=price;
        this.description=description;
        

    }

    save() {
        // products.push(this)
        this.id=Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }


    static fetchAll(cb) {

        getProductsFromFile(cb);



    }


    static findById(id,cb){
        getProductsFromFile(products =>{
            const product=products.find(p => p.id==id);
            cb(product);
        });
    }
}