const express = require('express')
const morgan = require('morgan')
const mainRoutes = require('./routes/mainRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')

const app = express()

// Middlewares
app.use(cors());  
app.use(express.json());      // Parsear JSON
app.use(morgan('dev'));       // Registrar solicitudes




app.use('/api', mainRoutes);


app.use(errorHandler);
module.exports = app