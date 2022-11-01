const router = require('express').Router()

const multer =require('multer');
const fs = require('fs');
const conexion = require('../../config/conexion');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');


//Get solicitudes revisor
router.post('/revisor',(req,res)=>{
    const {id_usuario, id_proceso} = req.body
    let sql = `SELECT acom.*,
    autor.nombre AS nom_autor, autor.apellidos AS ape_autor,
    interno.nombre AS nom_interno , interno.apellidos AS  ape_interno,
    externo.nombre AS nom_externo , externo.apellidos AS  ape_externo,
    proce.departamento AS nom_proceso

     FROM acompanamiento acom 
     JOIN usuarios autor ON autor.id_usuario = acom.id_usuario
     JOIN usuarios interno ON interno.id_usuario = acom.id_revisor_interno
     JOIN usuarios externo ON externo.id_usuario = acom.id_revisor_externo 
     JOIN procesos proce ON proce.id_proceso = acom.id_proceso

     WHERE (acom.id_revisor_interno = '${id_usuario}' OR acom.id_revisor_externo = '${id_usuario}' ) 
     AND acom.id_proceso = '${id_proceso}' 
      ` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err 
        }
        else{
            res.json(rows);
        }
    });
})

//Get solicitudes solicitudes
router.post('/solicita',(req,res)=>{
    const {id_usuario, id_proceso} = req.body
    let sql = `SELECT acom.*, 
    autor.nombre AS nom_autor, autor.apellidos AS ape_autor,
    interno.nombre AS nom_interno , interno.apellidos AS  ape_interno,
    externo.nombre AS nom_externo , externo.apellidos AS  ape_externo,
    proce.departamento AS nom_proceso

     FROM acompanamiento acom 
     JOIN usuarios autor ON autor.id_usuario = acom.id_usuario
     JOIN usuarios interno ON interno.id_usuario = acom.id_revisor_interno
     JOIN usuarios externo ON externo.id_usuario = acom.id_revisor_externo 
     JOIN procesos proce ON proce.id_proceso = acom.id_proceso

     WHERE acom.id_usuario = '${id_usuario}' AND acom.id_proceso = '${id_proceso}'  ` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err
        }
        else{
            res.json(rows);
        }
    });
})

//Get Procesos para revision 
router.get('/proceso_revision',(req,res)=>{
    
    let sql = ` SELECT * 
    FROM procesos proce
    WHERE proce.id_proceso >1 AND proce.estatus_proceso = 1` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err
        }
        else{
            res.json(rows);
        }
    });
})

//Get de usuarios que pueden resisar
router.post('/revisores_interno',(req,res)=>{
    const{id_proceso} = req.body;
    let sql = ` SELECT * 
    FROM logs_procesos logs
    JOIN usuarios usu ON usu.id_usuario = logs.id_usuario
    WHERE logs.id_proceso >1 AND (usu.tipoUsuario =2 OR usu.tipoUsuario =3) AND logs.id_proceso = '${id_proceso}'` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err
        }
        else{
            res.json(rows);
        }
    });
})

//Get de usuarios que pueden resisar
router.get('/revisores_externo',(req,res)=>{

    let sql = ` SELECT * 
    FROM logs_procesos logs
    JOIN usuarios usu ON usu.id_usuario = logs.id_usuario
    WHERE logs.id_proceso =1 ` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err
        }
        else{
            res.json(rows);
        }
    });
})

//get procesos con contador
router.post('/contador',(req,res)=>{
    const{id_revisor,id_proceso} = req.body;
    let sql = ` 
    SELECT COUNT(*) AS contador
    FROM acompanamiento 
    WHERE (revision_interna = 0 OR revision_externa = 0 ) 
    AND (id_revisor_interno ='${id_revisor}' OR id_revisor_externo ='${id_revisor}') 
    AND id_proceso ='${id_proceso} order by id_proceso'
    ` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            throw err
        }
        else{
            res.json(rows);
        }
    });
})



// Creacion de documentos
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); 
      const fileName = Date.now(); 
      cb(null, `${fileName}.${ext}`); 
    },
    destination: function (res, file, cb) {
      cb(null, `./uploads/acompanamiento`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const {id_usuario, id_revisor_interno, id_revisor_externo, id_proceso, solicita_nom, revision_externa }= req.body;
    

     let sql =  `INSERT INTO acompanamiento (id_usuario, id_revisor_interno, id_revisor_externo, id_proceso, solicita_nom, revision_interna,revision_externa, solicita_doc) 
     VALUES ( '${id_usuario}', '${id_revisor_interno}','${id_revisor_externo}', '${id_proceso}', '${solicita_nom}',0,'${revision_externa}', '${file}') ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { 
                    res.json({msg: err, ok : false});
                }
                else{
                    res.json({msg: 'Carpeta eliminada', ok : true});
                }
            });
  });

  

  //get Documentos
// router.get('/:filename',async(req, res)=>{


//     const path1 = path.join(__dirname , `../../uploads/acompanamiento/${req.params.filename}`)
    
//     if (fs.existsSync(path1)) {
//         res.contentType("application/pdf");
//         fs.createReadStream(path1).pipe(res)
//         fs.createReadStream(path1).pipe(res)
//     } else {
//         res.status(500)
        
//         res.send('File not found')
//     }

// })

// Update de Solicitudes 
router.put('/update_interno',(req,res)=>{
    const{id_solicitud,revision_interna} = req.body;
    let sql = `UPDATE acompanamiento SET revision_interna ='${revision_interna}' WHERE id_solicitud  = '${id_solicitud}' `;
    
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})

//Update externo
router.put('/update_externo',(req,res)=>{
    const{id_solicitud,revision_externa} = req.body;
    let sql = `UPDATE acompanamiento SET revision_externa ='${revision_externa}' WHERE id_solicitud  = '${id_solicitud}' `;
    
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})



//Agregar una observacion 
router.post('/addobservacion',(req,res)=>{
    const{id_solicitud,observacion} = req.body;

    let sql =  `INSERT INTO observaciones (id_solicitud, observacion) 
    VALUES ( '${id_solicitud}', '${observacion}')` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

//Get una observacion 
router.post('/getobservacion',(req,res)=>{
    const{id_solicitud} = req.body;

    let sql =  `SELECT * FROM  observaciones WHERE id_solicitud = '${id_solicitud}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows)
        }
    });
    
})


//Delete una observacion 
router.post('/deleteobservacion',(req,res)=>{
    const{id_solicitud} = req.body;

    let sql =  `DELETE FROM observaciones WHERE id_solicitud = '${id_solicitud}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

//Delete acompañameinto
router.post('/deleteacompana',(req,res)=>{
    const{id_solicitud} = req.body;

    let sql =  `DELETE FROM acompanamiento WHERE id_solicitud = '${id_solicitud}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})


//Delete documento
router.post('/deletedocumento',(req,res)=>{
    const{solicita_doc} = req.body;

    fs.unlink(`./uploads/acompanamiento/${solicita_doc}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});


//get Documentos
router.get('/:filename',async(req, res)=>{

    var file = path.join(__dirname , `../../uploads/acompanamiento/${req.params.filename}`);
    res.download(file, function (err) {
        if (err) {
            
            
        } else {
            
        }
    });

})

module.exports=router;