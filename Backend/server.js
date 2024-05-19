
const express = require('express');
require('./Models/mongodbConnection.js');
const propertyRoutes=require('./Routes/PropertyRoutes.js')
const dotenv = require('dotenv');
dotenv.config(); 

const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());
app.use('/api/var/property',propertyRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});


