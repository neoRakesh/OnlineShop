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
    constructor(t) {
        this.title = t;

    }

    save() {
        // products.push(this)

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
}