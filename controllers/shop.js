const Product=require('../models/product');
const Cart=require('../models/cart');



exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(product =>
  res.render('shop/product-list', {
    prods:product,
    pageTitle: 'All Products List',
    path: '/products',
      // hasProducts: rows.length > 0,
      // activeShop: true,
      // productCSS: true
  }))
  .catch(err =>{console.log(err)})
  

 
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  console.log(prodId);
  Product.findAll({where :{id:prodId}})
  .then(product =>{
    res.render ('shop/product-details',{
      product : product[0],
      pageTitle:product[0].title,
      path:'/products'
     });
   })
  .catch(err => {console.log(err)});
  
  

}

exports.getIndex = (req,res,next) =>{
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    
    });
  })
  .catch(err =>{console.log(err)});
  
}

exports.getCart=(req,res,next) => {
    Cart.getCart( cart => {
      Product.fetchAll(products =>{
        const cartProducts =[];
        for(product of products){
          const cartProductData=cart.products.find(prod => prod.id ==product.id);
          if(cartProductData){
              cartProducts.push({productData: product, qty :cartProductData.qty});
          }
        }
        res.render('shop/cart', {
          pageTitle: 'Your Cart',
          path: '/cart',
          products: cartProducts,
          carts: cart
         
        }
      );
    });});
  

  
}

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,(product) =>{
    Cart.addProduct(prodId,product.price);
  });
 
  res.redirect('/cart');
}
 
exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findById(prodId, product =>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart');
  });
}

exports.getOrders=(req,res,next) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
   
  });


}

exports.getCheckout=(req,res,next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
   
  });


}
