const Sequelize = require('sequelize');

const sequelize=require('../util/database');

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },

    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },

    description: {
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports= Product;







// module.exports = class Products {
//     constructor(id,title,imageUrl,description,price) {
//         this.id=id;
//         this.title = title;
//         this.imageUrl=imageUrl;
//         this.price=price;
//         this.description=description;
        

//     }

//     save() {
//         // products.push(this)
//        return db.execute('INSERT INTO products (title,price,description,imageUrl) values(?,?,?,?)',
//         [this.title,this.price,this.description,this.imageUrl]);

//             }


//     static fetchAll() {

//         return db.execute('SELECT * FROM products');
//     }


//     //Deleting Products

//     static deleteById(){

       
//     }

//     static findById(id){
//        return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
       
//     }
// }