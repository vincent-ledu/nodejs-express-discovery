exports.secret = function(req, res, next) {
    console.log(req.headers)
    if (req.headers.secret === 'OK') {
        console.log("access OK")
        next()
    } else {
        res.status(403).send("not authorized")
    }
}