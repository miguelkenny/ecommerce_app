const fs = require('fs').promises;
const path = require('path');

let cart = async () => JSON.parse(await fs.readFile(path.join(__dirname, './data/cart.json'), 'utf-8'))
let products = async () => JSON.parse(await fs.readFile(path.join(__dirname, './data/products.json'), 'utf-8'))

const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
}

const postCart = async (req, res) => {
    try {
        const newCart = await cart()
        const timestamp = Date.now()
        newCart.push({ id: generarId(), timestamp, productos: [] })
        res.status(200).json(newCart)
        fs.writeFile(path.join(__dirname, './data/cart.json'), JSON.stringify(newCart), 'utf-8')
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const deleteCart = async (req, res) => {
    try {
        const idCart = req.params.id

        if (idCart !== '') {
            const newCart = await cart()

            const newArrayCart = newCart.filter(cart => cart.id !== idCart)

            fs.writeFile(path.join(__dirname, './data/cart.json'), JSON.stringify(newArrayCart), 'utf-8')
            res.status(200).json(`Carrito Eliminado: ${newArrayCart}`)

        } else res.status(401).json('Debe agregar un ID de carrito')
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const getListProductsByIdCart = async (req, res) => {
    try {
        const idCart = req.params.id
        const newCart = await cart()

        newCart.forEach(cart => {
            if (cart.id === idCart) {
                res.status(200).json(cart.productos)
            }
        })
    } catch (error) {
        console.log(`Error ${error}`);
    }

}

const postProductAtCart = async (req, res) => {
    try {
        const fileProducts = await products()
        const newCart = await cart()
        const idProd = Number(req.params.id)

        fileProducts.forEach(product => {
            if (product.id === idProd) {

                if (product.stock > 0) {

                    newCart[0].productos.push(product)
                    res.status(200).json(newCart)

                } else res.status(401).json('El producto no cuenta con stock suficiente')
            }
        })
        fs.writeFile(path.join(__dirname, './data/cart.json'), JSON.stringify(newCart), 'utf-8')

    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const deleteProductOnCartByIdProduct = async (req, res) => {
    try {
        const newCart = await cart()
        const idCart = req.params.id
        const idProd = Number(req.params.id_prod)

        const indexCart = newCart.findIndex(cart => cart.id === idCart)

        if (!indexCart) {
            const productInCart = newCart[indexCart].productos.filter(prod => prod.id !== idProd)
            console.log(productInCart.length);

            newCart[indexCart].productos = productInCart

            fs.writeFile(path.join(__dirname, './data/cart.json'), JSON.stringify(newCart), 'utf-8')
            res.status(200).send(newCart)

        } else res.status(401).json('EL ID de carrito no existe')

    } catch (error) {
        console.log(`Error ${error}`);
    }
}

module.exports = {
    postCart,
    deleteCart,
    getListProductsByIdCart,
    postProductAtCart,
    deleteProductOnCartByIdProduct
}