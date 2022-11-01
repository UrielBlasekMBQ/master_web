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


    // var file = path.join(__dirname, '../../uploads/1662503887525.pdf');
    // res.download(file, function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });

    const path1 = path.join(__dirname , `../../uploads/marco_legal/${req.params.filename}`)
    
    if (fs.existsSync(path1)) {
        res.contentType("application/pdf");
        fs.createReadStream(path1).pipe(res)
        fs.createReadStream(path1).pipe(res);
    } else {
        res.status(500)
        res.send('File not found')
    }

 })


 //Modimficar
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{id_marco,id_proceso,nom_marco} = req.body;
    let sql =`UPDATE marco_legal SET nom_marco = '${nom_marco}'  WHERE id_marco = '${id}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})







module.exports=router;