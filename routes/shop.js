const path=require('path');

const express = require('express');

const rootDir=require('../util/path');


const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);





// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(rootDir,'views','shop.'));
// });

module.exports = router;
