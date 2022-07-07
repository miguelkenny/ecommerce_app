const fs = require('fs').promises
const path = require('path')

let products = async () => JSON.parse( await fs.readFile(path.join(__dirname, './data/products.json'), 'utf-8'))

const getProducts = async (req, res) => {
    try {
        const fileProducts = await products()

        res.status(200).json(fileProducts)
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const getProductsByID = async (req, res) => {
    try {
        const fileProducts = await products()

        const id = Number(req.params.id)

        if (!isNaN(id)) {
            const prod = fileProducts.filter(product => product.id === id)
            res.status(200).json(prod)
        }
        res.send('ID debe ser un número')
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

//POST DE PRODUCTOS
const postProducts = async (req, res) => {
    try {
        const fileProducts = await products()
    
        const {nombre, descripcion, precio, url} = req.body

        const id = fileProducts.length ? ((fileProducts[fileProducts.length - 1].id) + 1) : fileProducts.length + 1;
        const timeStamp = Date.now()

        if([nombre, descripcion, precio, stock, url].includes !== ''){
            fileProducts.push({nombre, descripcion, precio, stock, url, id, timeStamp})
            fs.writeFile(path.join(__dirname, './data/products.json'), JSON.stringify(fileProducts), 'utf-8')
        }
        res.status(201).json(fileProducts)
        
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const putProducts = async (req, res) => {
    try {
        const {nombre, descripcion, precio, stock, url} = req.body
        
        if([nombre, descripcion, precio, stock, url].includes !== ''){
            const id = Number(req.params.id)
            
            if(!isNaN(id)){
                const fileProducts = await products()

                fileProducts.forEach((product, i) => {

                    if(product.id === id){
                        fileProducts[i].nombre = nombre
                        fileProducts[i].descripcion = descripcion
                        fileProducts[i].precio = precio
                        fileProducts[i].stock = stock
                        fileProducts[i].url = url
                        res.status(200).send('Producto actualizado')
                    }

                })
                fs.writeFile(path.join(__dirname, './data/products.json'), JSON.stringify(fileProducts), 'utf-8')

            } else res.status(401).json('El ID debe ser un numero')
        } else res.status(401).send('Todos los campos son requeridos')
        
    } catch (error) {
        console.log(`Error ${error}`);
    }
}

const deleteProducts = async (req, res) => {
    const id = Number(req.params.id)
            
    if(!isNaN(id) && id !== ''){
        const fileProducts = await products()
        const newArrayProducts = fileProducts.filter(product => product.id !== id)

        fs.writeFile(path.join(__dirname, './data/products.json'), JSON.stringify(newArrayProducts), 'utf-8')
        res.status(200).json(newArrayProducts).redirect('/api/productos')

    } else res.status(401).json('El ID debe ser un numero')
}

module.exports = {
    getProducts,
    getProductsByID,
    postProducts,
    putProducts,
    deleteProducts
}