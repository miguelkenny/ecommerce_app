const routeError = (req, res)=>{
    const error = req.params.ruta
    res.status(404).send({error: -2, ruta: `${req.path} X metodo ${req.method} no implementedo`})
}

module.exports = {routeError}