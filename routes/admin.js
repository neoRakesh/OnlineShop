const express = require('express');
const path=require('path');

const rootDir=require('../util/path');

const router = express.Router();

const adminController = require('../controllers/admin');



// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//admin/products=>GET

router.get('/products',adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

//Edit admin Product
router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);



// // /admin/add-product => GET
// router.get('/add-product', (req, res, next) => {
//   res.sendFile(path.join(rootDir,'views','add-product.html'));
// });

// // /admin/add-product => POST
// router.post('/add-product', (req, res, next) => {
//   console.log(req.body);
//   res.redirect('/');
// });

module.exports = router;
