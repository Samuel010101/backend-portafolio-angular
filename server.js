require('dotenv').config()
const express = require('express')
const connectDb = require('./db/mongodb')
const { appConfig, dbConfig } = require('./config')

const app = express()

// Manejando los errores de conexión a la base de datos 
async function initApp (appConfig, dbConfig) {
    try{
        connectDb(dbConfig)
        app.listen(appConfig.port, () => console.log(`listen on ${appConfig.port}`))
    }catch(e) {
        console.log(e)
        process.exit(0) // con esta linea mato el proceso despues de ejecutarlo
    }
}

initApp(appConfig, dbConfig);