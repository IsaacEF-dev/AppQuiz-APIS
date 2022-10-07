// const Response = require('./response')
// const response = new Response()
class Validation {

    regularExp() {
        const ERESPACIOS = /\s/
        
        const ERNOMBRES = /^([a-zA-Z]{1,2}[.]{1}[ ]{1})?[a-zA-Z][a-z A-Z]+[a-zA-Z]([ ]{1}[a-zA-Z]{1,2}[.]{1})?$/
                          

        const ERCREDENCIAL = /^([a-zA-Z0-9_]+)$/
        
        //Acepta cualquier caracter, mientras el dato contenga letras
        const ERLETRAS = /^[a-zA-ZñÑ0-9¿¡#$"'`(][a-z A-ZáéíóúÁÉÍÓÚñÑ0-9()`.:,;_$#!¡¿?/|+"'-]+([a-zA-ZñÑ0-9."'`/)]+)?$/
        
        //Solo letras
        const ERSTRING = /^[a-zA-ZñÑ][a-z A-ZáéíóúÁÉÍÓÚñÑ-]+[a-zA-ZñÑ ]$/

        //Validación para texto con números y tildes, pero sin caracteres especiales
        const LETNUM = /^[0-9A-Za-záéíóúÁÉÍÓÚñÑ. ]*$/
        
        const ERNUMEROS = /^[0-9]+$/
        const ERTELEFONO = /^[0-9]{10}$/
        const ERFLOTANTES = /^[0-9]+([.][0-9]+)?$/
        const ERCOORDENADAS = /^([-]{1})?[0-9]+([.][0-9]+)?$/
        const ERCALLES = /^([0-9]{1,4}[ ]{1})?[a-zA-Z][a-z A-Z]+[a-zA-Z]([ ]{1}[0-9]{1,4})?$/
        const ERHEXADECIMAL = /^[#]{1}[0-9a-fA-F]{6,8}$/
        const NUMERO_INEX = /^[0-9]+[A-Z a-z]?$/
        const PRECIOS = /^\d*(\.\d{1})?\d{0,1}$/
        const SERIALES=/^([0-9aA-zZ]+\-+[0-9aA-zZ]+)+$/


        //EMAIL
        const EREMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        //AÑO/MES/DIA
        const ERFECHAS = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/

        const TIMESTAMP=/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/

        return {
            nombres: ERNOMBRES,
            credencial: ERCREDENCIAL,
            letras: ERLETRAS,
            numeros: ERNUMEROS,
            flotantes: ERFLOTANTES,
            coordenadas: ERCOORDENADAS,
            calles: ERCALLES,
            correos: EREMAIL,
            fechas: ERFECHAS,
            string: ERSTRING,
            hexadecimal: ERHEXADECIMAL,
            numeroinex: NUMERO_INEX,
            espacios: ERESPACIOS,
            telefono: ERTELEFONO,
            precios: PRECIOS,
            letnum: LETNUM,
            seriales:SERIALES,
            timestamp:TIMESTAMP,
        }
    }

    tryOut(data, re, length) {
        for (let i in data) {
           
            if (data[i] == undefined) { return false};
        
            if (!re.test(data[i])) {return false};
            
            
            if (data[i].length >= length) return false;
            
        }

        return true
    }
    
    //Validación para los casos en que el array contiene de 1 a n Objects con n parámetros
    tryOutArray(data, length) {
        for (let i in data) {
            if (Object.keys(data[i]).length > length) return false
        }

        return true
    }

    tryOutUpdate(data, re, length, lengthep) {
        for (let i in data) {
            
            if (data[i] == undefined) return false
            
            if (!(re.test(data[i]) || data[i] == 0 || data[i] == 'S/R')) return false
            
            if (data[i].length >= length) return false
            //Validar que solo venga un digito
            if (data[i] == 0) {
                if (data[i].length > 1) return false
            }
            //Tamaño de la cadena especifico
            if (lengthep) {
                if (data[i].length != lengthep) return false
            }
        }

        return true
    }

    tryOutReq(req, res, lengthQ, lengthB) {
        return new Promise((resolve, reject) => {
            if (Object.keys(req.query).length > lengthQ || Object.keys(req.body).length > lengthB) {
                return reject(response.sendBadRequest(res))
            }

            resolve(1)
        })
    }

    tryOutBase64(data){
        
        // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
        const formatosImagenValidos = ['image/png','image/jpeg' ]

        for (let i in data) {
            
            if (data[i] == undefined) return false

            // Valida que el buffer sea una imagen
            if(!/^data:image\/[a-z]+;base64,/.test(data[i])) return false
            
            
            // Extrae la extension desde el buffer
            const extension = data[i].match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
            
            // Valida que la extension este definida
            if (extension == undefined || extension.length == undefined) return false
            

            // Valida que la extension este incluida en los formatos validos
            if (!formatosImagenValidos.includes(extension[1])) return false
        }

        return true
    }

    reemplazarAcentos(data)
        {
            const chars={
                "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
                "à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u", "ñ":"n",
                "Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
                "À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", "Ñ":"N"}
            const expr = /[áàéèíìóòúùñ]/ig;
            const res = data.replace(expr,function(e){return chars[e]});
            return res;
        }

}

module.exports = Validation