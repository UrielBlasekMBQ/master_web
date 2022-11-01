const router = require('express').Router()

const multer =require('multer');
const fs = require('fs');
const conexion = require('../../config/conexion');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');


// Asignamos todas las rutas
//Get 

//get Documentos
router.get('/:filename',async(req, res)=>{


    var file = path.join(__dirname , `../../uploads/normas_iso/${req.params.filename}`);
    res.download(file, function (err) {
        if (err) {

        } else {

        }
    });

    // const path1 = path.join(__dirname , `../../uploads/${req.params.filename}`)
    
    // if (fs.existsSync(path1)) {
    //     res.contentType("application/pdf");
    //     fs.createReadStream(path1).pipe(res)
    //     console.log(fs.createReadStream(path1).pipe(res));
    // } else {
    //     res.status(500)
    //     console.log('File not found')
    //     res.send('File not found')
    // }

})




module.exports=router;