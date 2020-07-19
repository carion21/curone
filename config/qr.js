const QRCode = require('qrcode')

class Qr {
    static create(message){
        QRCode.toDataURL(message, { errorCorrectionLevel: 'H' },  (err, url) => {
            //console.log(url);
            
            return url
        })
    }
}

module.exports = Qr