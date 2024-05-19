const Property = require('../Models/propertyModel');

// Create new property
const createProperty = async (req, res) => {
    try {
        const { name, address, city, state } = req.body;
        const newProperty = new Property({ name, address, city, state });
        await newProperty.save();
        const properties = await Property.find();
        res.status(201).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch property details by city
const getPropertyDetails = async (req, res) => {
    try {
        const  {city}  = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        const properties = await Property.find({ city: city });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update property details
const updatePropertyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, city, state } = req.body;
        const property = await Property.findByIdAndUpdate(id, { name, address, city, state }, { new: true });
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Find cities by state
const findCitiesByState = async (req, res) => {
    try {
        const { state } = req.query;
        if (!state) {
            return res.status(400).json({ error: 'State is required' });
        }
        const properties = await Property.find({ state: state });
        const cities = [...new Set(properties.map(prop => prop.city))];
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Find similar properties by city of given property_id
const findSimilarProperties = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        const properties = await Property.find({ city: property.city });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProperty,
    getPropertyDetails,
    updatePropertyDetails,
    findCitiesByState,
    findSimilarProperties
};
