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
//get Documentos
router.get('/:filename',async(req, res)=>{


    // var file = path.join(__dirname, '../../uploads/1662623702408.pdf');
    // res.download(file, function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });

    const path1 = path.join(__dirname , `../../uploads/operacion_legal/hijos/${req.params.filename}`)
    
    if (fs.existsSync(path1)) {
        res.contentType("application/pdf");
        fs.createReadStream(path1).pipe(res)
        fs.createReadStream(path1).pipe(res);
    } else {

    }

 })





// Creacion de documentos
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); 
      const fileName = Date.now(); 
      cb(null, `${fileName}.${ext}`); 
    },
    destination: function (res, file, cb) {
      cb(null, `./uploads/operacion_legal/hijos`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const { id_proceso, nom_operacion, id_operacion}= req.body;


     let sql =  `INSERT INTO operacion_legal (id_proceso, nom_operacion, dir_operacion, carp_operacion, file_operacion, id_vista ) 
     VALUES ( '${id_proceso}', '${nom_operacion}', '${file}', 0 , '${id_operacion}', 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                  res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });






module.exports=router;