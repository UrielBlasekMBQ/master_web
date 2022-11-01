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


    const path1 = path.join(__dirname , `../../uploads/capacitacion_legal/${req.params.filename}`)
    
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
    const{id_capacitacion,id_proceso,nom_capacitacion} = req.body;
    let sql =`UPDATE capacitacion_legal SET nom_capacitacion = '${nom_capacitacion}'  WHERE id_capacitacion = '${id}'`

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