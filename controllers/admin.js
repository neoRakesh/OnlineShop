const Product=require('../models/product');



// exports.getAddProduct = (req, res, next) => {
//     res.render('admin/add-product', {
//       pageTitle: 'Add Product',
//       path: '/admin/add-product',
//       formsCSS: true,
//       productCSS: true,
//       activeAddProduct: true
//     });
//   };
  
//   exports.postAddProduct = (req, res, next) => {
//    // const product=new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
//    const title=req.body.title;
//    const imageUrl=req.body.imageUrl;
//    const price=req.body.price;
//    const description=req.body.description;
//    const product=new Product(title,imageUrl,price,description); 
//    product.save();
//     res.redirect('/');
//   };


//   //Edit and edit post products
//   exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//       return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     });
//   };
  
//   exports.postEditProduct = (req, res, next) => {
//    // const product=new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
//    const title=req.body.title;
//    const imageUrl=req.body.imageUrl;
//    const price=req.body.price;
//    const description=req.body.description;
//    const product=new Product(title,imageUrl,price,description); 
//    product.save();
//     res.redirect('/');
//   };


//   exports.getProducts =(req,res,next)=>{
//   Product.fetchAll(products=>{
//     res.render('admin/products',{
//       prods:products,
//       pageTitle:'Admin Products',
//       path:'/admin/products'
//     });
//   });
//   };



exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product
  .save()
  .then(res.redirect('/'))
  .catch(err => {
    console.log(err);
  });
  
};

  exports.postEditProduct = (req, res, next) => {
   // const product=new Product(req.body.title,req.body.imageUrl,req.body.price,req.body.description);
   const prodId = req.body.productId;
   const updatedTitle=req.body.title;
   const updatedPrice=req.body.price;
   const updatedImageUrl=req.body.imageUrl;
   
   const updatedDescription=req.body.description;
   const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice); 
   updatedProduct.save();
    res.redirect('/admin/products');
  };

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req,res,next) => {
  const prodId=req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
}
