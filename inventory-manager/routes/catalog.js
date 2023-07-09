const express = require('express')
const router = express.Router();

//require controllers
const carController = require('../controllers/carController')
const makeController = require('../controllers/makeController')
const bodyTypeController = require('../controllers/bodyTypeController')
const modelController = require('../controllers/modelController')
const yearController = require('../controllers/yearController')
//car routes

//Home catalog page
router.get('/', carController.index);
router.get('/car/create', carController.car_create_get)
router.post('/car/create', carController.car_create_post)
router.get('/car/:id/delete', carController.car_delete_get)
router.post('/car/:id/delete', carController.car_delete_post)
router.get('/car/:id/update', carController.car_update_get)
router.post('/car/:id/update', carController.car_update_post)
router.get('/car/:id', carController.car_detail)
router.get('/cars', carController.car_list)

router.get('/bodyType/create', bodyTypeController.bodyType_create_get)
router.post('/bodyType/create', bodyTypeController.bodyType_create_post)
router.get('/bodyType/:id/delete', bodyTypeController.bodyType_delete_get)
router.post('/bodyType/:id/delete', bodyTypeController.bodyType_delete_post)
router.get('/bodyType/:id/update', bodyTypeController.bodyType_update_get)
router.post('/bodyType/:id/update', bodyTypeController.bodyType_update_post)
router.get('/bodyType/:id', bodyTypeController.bodyType_detail)
router.get('/bodyTypes', bodyTypeController.bodyType_list)

router.get('/make/create', makeController.make_create_get)
router.post('/make/create', makeController.make_create_post)
router.get('/make/:id/delete', makeController.make_delete_get)
router.post('/make/:id/delete', makeController.make_delete_post)
router.get('/make/:id/update', makeController.make_update_get)
router.post('/make/:id/update', makeController.make_update_post)
router.get('/make/:id', makeController.make_detail)
router.get('/makes', makeController.make_list)

router.get('/model/create', modelController.model_create_get)
router.post('/model/create', modelController.model_create_post)
router.get('/model/:id/delete', modelController.model_delete_get)
router.post('/model/:id/delete', modelController.model_delete_post)
router.get('/model/:id/update', modelController.model_update_get)
router.post('/model/:id/update', modelController.model_update_post)
router.get('/model/:id', modelController.model_detail)
router.get('/models', modelController.model_list)

router.get('/year/create', yearController.year_create_get)
router.post('/year/create', yearController.year_create_post)
router.get('/year/:id/delete', yearController.year_delete_get)
router.post('/year/:id/delete', yearController.year_delete_post)
router.get('/year/:id/update', yearController.year_update_get)
router.post('/year/:id/update', yearController.year_update_post)
router.get('/year/:id', yearController.year_detail)
router.get('/years', yearController.year_list)

module.exports = router;