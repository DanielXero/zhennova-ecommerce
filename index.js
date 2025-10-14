const app = require('./src/app')
require('dotenv').config({quiet: true})



const PORT = process.env.PORT || 3001



app.listen(PORT, () => {
    console.log(`Servidor Zhennova escuchando en http://localhost:${PORT}`)
})
