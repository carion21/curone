var express = require('express');
var router = express.Router();
const QRCode = require('qrcode')
const acces = require('../config/constante').acces()


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/jeveux_lecode', (req, res, next) => {
    const data = req.body

    console.log(data.length)

    if (data != null && data.length != 0) {
        var lemotdepasse = data.lemotdepasse
        var letexte = data.letexte

        if(lemotdepasse != ""){
            if (letexte != "") {
                if (lemotdepasse === acces) {
                    QRCode.toDataURL(letexte, { errorCorrectionLevel: 'H' },  (err, url) => {
                        
                        var result = {
                            status: 1,
                            leqrcode: url
                        }
                        res.json(result)

                    })
                } else {
                    var error = "La valeur 'lemotdepasse' est incorrecte..."
                    var result = {
                        status: 1,
                        error: error
                    }
                    res.json(result)
                }
            } else {
                var error = "La valeur 'letexte' est vide..."
                var result = {
                    status: 1,
                    error: error
                }
                res.json(result)
            }
        } else {
            var error = "La valeur 'lemotdepasse' n'existe pas..."
            var result = {
                status: 1,
                error: error
            }
            res.json(result)
        }

        
    } else {
        var error = "Je n'ai rien reçu..."
        var result = {
            status: 1,
            error: error
        }
        res.json(result)
    }
    
})

router.get('/jeveux_limage/:letexte/:lemotdepasse', (req, res, next) => {
    var data = req.params


    if (data != null && data != undefined) {
        var lemotdepasse = data.lemotdepasse
        var letexte = data.letexte

        if(lemotdepasse != ""){
            if (letexte != "") {
                if (lemotdepasse == acces) {
                    QRCode.toDataURL(letexte, { errorCorrectionLevel: 'H' },  (err, url) => {
                        
                        var result = {
                            status: 1,
                            leqrcode: url
                        }
                        //console.log(result)
                        res.render('limage', {
                            title: 'Curone',
                            qrcode: url
                        })
                        
                    })
                    
                } else {
                    var error = "La valeur 'lemotdepasse' est incorrecte..."
                    var result = {
                        status: 1,
                        error: error
                    }
                    console.log(result)
                    //res.json(result)
                    res.send(error)
                }
            } else {
                var error = "La valeur 'letexte' est vide..."
                var result = {
                    status: 1,
                    error: error
                }
                console.log(result)
                //res.json(result)
                res.send(error)
            }
        } else {
            var error = "La valeur 'lemotdepasse' n'existe pas..."
            var result = {
                status: 1,
                error: error
            }
            console.log(result)
            //res.json(result)
            res.send(error)
        }

        
    } else {
        var error = "Je n'ai rien reçu..."
        var result = {
            status: 1,
            error: error
        }
        console.log(result)
        //res.json(result)
        res.send(error)
    }
    
})



module.exports = router;