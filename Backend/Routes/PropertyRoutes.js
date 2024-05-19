const express = require('express');
const { createProperty, getPropertyDetails, updatePropertyDetails, findCitiesByState, findSimilarProperties } = require('../controller/propertyController');
const router = express.Router();

router.post('/createProperty', createProperty);
router.get('/getAllProperties', getPropertyDetails);
router.put('/updateProperty/:id', updatePropertyDetails);
router.get('/findCitiesByState', findCitiesByState);
router.get('/findSimilarProperties/:id', findSimilarProperties);






module.exports= router;