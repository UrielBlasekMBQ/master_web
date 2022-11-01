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
// router.get('/:filename',async(req, res)=>{


    // var file = path.join(__dirname, '../../uploads/1662503887525.pdf');
    // res.download(file, function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });

//     const path1 = path.join(__dirname , `../../uploads/capacitacion_legal/${req.params.filename}`)
    
//     if (fs.existsSync(path1)) {
//         res.contentType("application/pdf");
//         fs.createReadStream(path1).pipe(res)
//         console.log(fs.createReadStream(path1).pipe(res));
//     } else {
//         res.status(500)
//         console.log('File not found')
//         res.send('File not found')
//     }

// })



//Get Hijos
router.post('/',(req,res)=>{
    
    const {id_capacitacion, id_proceso} = req.body
    let sql = `SELECT * FROM capacitacion_legal WHERE id_proceso = '${id_proceso}' AND file_capacitacion ='${id_capacitacion}' `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows); 
        }
    });
    
})


//Get Get Padres
router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = `SELECT * FROM capacitacion_legal WHERE id_proceso = '${id}' AND carp_capacitacion = 1 ` ;
    conexion.query(sql,[id],(err,rows,fields)=>{
        if (err) { throw err
            
        } 
        else{
            res.json(rows);
        }
    });
})




// Creacion de documentos
  router.put("/", (req, res) => {

    const { id_proceso, nom_capacitacion}= req.body;

     let sql =  `INSERT INTO capacitacion_legal (id_proceso, nom_capacitacion, carp_capacitacion, file_capacitacion, id_vista ) 
     VALUES ( '${id_proceso}', '${nom_capacitacion}', 1 , 0, 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { 
                    res.json({msg: err, ok : false});
                }
                else{
                    res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });

 
  /////////// Eliminar  /////////////////////////

  // Eliminacion padre he hijos 
  router.post('/getpadrehijo',(req,res)=>{
    
    const {id_capacitacion} = req.body
    let sql = `SELECT * FROM capacitacion_legal WHERE id_capacitacion ='${id_capacitacion}'  OR file_capacitacion ='${id_capacitacion}' `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows); 
        }
    });
    
})

//Eliminar documento de padre

router.post('/deletedocumentopadre',(req,res)=>{
    const{dir_capacitacion} = req.body;
    
    fs.unlink(`./uploads/capacitacion_legal/${dir_capacitacion}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});

//Eliminar documento de hijo

router.post('/deletedocumentohijo',(req,res)=>{
    const{dir_capacitacion} = req.body;
    
    fs.unlink(`./uploads/capacitacion_legal/hijos/${dir_capacitacion}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});



router.post('/deletepadreshijos',(req,res)=>{
    const {id_capacitacion}= req.body;

    let sql=`DELETE FROM capacitacion_legal WHERE id_capacitacion = '${id_capacitacion}'  OR file_capacitacion ='${id_capacitacion}'`;


    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})


router.post('/deletehijo',(req,res)=>{
    const {id_capacitacion}= req.body;

    let sql=`DELETE FROM capacitacion_legal WHERE id_capacitacion = '${id_capacitacion}' `;


    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})




/////////// Eliminar  /////////////////////////

///////////////Send al historial //////

router.post('/sendHistorial',(req,res)=>{
    const {id_capacitacion, id_usuario, fecha_actual}= req.body;

    let sql=`INSERT INTO historial_capacitacion (id_capacitacion, id_usuario, fecha_actual) 
                                           VALUE('${id_capacitacion}', '${id_usuario}', '${fecha_actual}')`;


    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se agrego al historial', ok : true});
        }
    });
})


///////////////Send al historial //////


///////////// Vista de historial ///////

//Get Get Padres
router.post('/viewHistorial',(req,res)=>{
    const {id_capacitacion} = req.body
    let sql = `SELECT * 
              FROM  historial_capacitacion hist
              JOIN capacitacion_legal cap ON cap.id_capacitacion = hist.id_capacitacion
              JOIN usuarios usu ON usu.id_usuario = hist.id_usuario
              WHERE hist.id_capacitacion = '${id_capacitacion}'
              ORDER BY id_hist_capacitacion DESC`;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        } 
        else{
            res.json(rows);
        }
    });
})

// Eliminar Historial

router.post('/deleteCapacitacion',(req,res)=>{
    const {id_capacitacion}= req.body;

    let sql=`DELETE FROM capacitacion_legal WHERE id_capacitacion = '${id_capacitacion}' `;


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