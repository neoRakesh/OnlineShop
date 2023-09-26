const db=require('../util/database');

const Cart=require('./cart');





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
       return db.execute('INSERT INTO products (title,price,description,imageUrl) values(?,?,?,?)',
        [this.title,this.price,this.description,this.imageUrl]);

            }


    static fetchAll() {

        return db.execute('SELECT * FROM products');
    }


    //Deleting Products

    static deleteById(){

       
    }

    static findById(id){
       return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
       
    }
}