const { Router } = require('express')

const { getProducts,
        getProductsByID, 
        postProducts, 
        putProducts, 
        deleteProducts 
    } = require("../Controllers/productsControllers") //Controlador de Rutas Productos

const { postCart, 
        deleteCart,
        getListProductsByIdCart,
        postProductAtCart,
        deleteProductOnCartByIdProduct
    } = require("../Controllers/cartControllers") //Controlador de Rutas Carrito

const { verifyUser }= require("../Controllers/verifyUser") //Verificar si es usuario o admin
const { routeError } = require("../Controllers/data/routeError")

const routes = Router()

//CONTROLADOR DE PRODUCTOS
routes.get('/api/productos', getProducts) //Permite listar todos los productos disponibles
routes.get('/api/productos/:id', getProductsByID) //Permite listar productos por el ID
routes.post('/api/productos', verifyUser,postProducts) //Incorporar productos al listado (disponible para administradores)
routes.put('/api/productos/:id', verifyUser, putProducts) //Actualiza un producto por su id (disponible para administradores)
routes.delete('/api/productos/:id', verifyUser, deleteProducts) //Borra un producto por su id (disponible para administradores)

//CONTROLADOR DE CARRITO
routes.post('/api/carrito', postCart) //Crea un carrito y devuelve el ID
routes.delete('/api/carrito/:id', deleteCart) //Vacía un carrito y lo elimina
routes.get('/api/carrito/:id/productos', getListProductsByIdCart) //Permite listar todos los productos guardados en el carrito
routes.post('/api/carrito/:id/productos', postProductAtCart) //Incorpora productos al carrito por su id de producto
routes.delete('/api/carrito/:id/productos/:id_prod', deleteProductOnCartByIdProduct) //Eliminar un producto del carrito por su id de carrito y de producto

routes.get('/:ruta', routeError)

module.exports = routes