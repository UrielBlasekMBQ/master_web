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


    // var file = path.join(__dirname, '../uploads/1662623702408.pdf');
    // res.download(file, function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });

    const path1 = path.join(__dirname , `../../uploads/${req.params.filename}`)
    
    if (fs.existsSync(path1)) {
        res.contentType("application/pdf");
        fs.createReadStream(path1).pipe(res)
        fs.createReadStream(path1).pipe(res);
    } else {

    }

})

//Get documentos
router.post('/documentos',(req,res)=>{
    const {id_usuario, id_proceso} = req.body
    let sql = `SELECT ad.*,
    us.nombre AS nom_autor, us.apellidos AS apell_autor,
    revisa.nombre AS nom_revisor, revisa.apellidos AS apell_revisor,
    aprueba.nombre AS nom_aprueba, aprueba.apellidos AS apell_aprueba,
    proc.departamento AS nom_proceso,
    vig.*
    FROM document_asignado ad
    JOIN usuarios us ON ad.id_usuario = us.id_usuario
    JOIN vigencias vig ON vig.id_vigencia  = ad.vigencia
    JOIN usuarios revisa ON revisa.id_usuario  = ad.revisa_document
    JOIN usuarios aprueba ON aprueba.id_usuario  = ad.aprueba_document
    JOIN procesos proc ON proc.id_proceso = ad.id_proceso
    WHERE ad.id_usuario ='${id_usuario}' AND ad.id_proceso='${id_proceso}'` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
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
      cb(null, `./uploads`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const {generausuario, nombreProceso, tipoDocumento, nombreDocumento, vigencia, fecha_creacion, revisa_document, aprueba_document }= req.body;
    

     let sql =  `INSERT INTO document_asignado (id_usuario, id_proceso, tipoDocument, nom_document, vigencia, fecha_creacion, revisa_document, aprueba_document, documento, revisado,aprobado ) 
     VALUES ( '${generausuario}', '${nombreProceso}', '${tipoDocumento}', '${nombreDocumento}', '${vigencia}', '${fecha_creacion}', '${revisa_document}', '${aprueba_document}', '${file}', 0,0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { 
                    res.json({msg: err, ok : false});
                }
                else{
                    res.json({msg: 'Carpeta eliminada', ok : true});
                }
            });
  });











module.exports=router;