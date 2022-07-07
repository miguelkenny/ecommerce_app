const verifyUser = (req, res, next) => {
    const admin = true
    if(admin) {
        next()
    } else res.status(401).send({error: -1, ruta: `${req.path}`, metodo: `${req.method} no autorizado`})
}

module.exports ={verifyUser}