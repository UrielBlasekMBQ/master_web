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

    const path1 = path.join(__dirname , `../../uploads/registro_legal/hijos/${req.params.filename}`)
    
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
      cb(null, `./uploads/marco_legal/hijos`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const { id_proceso, nom_marco, id_marco}= req.body;
 

     let sql =  `INSERT INTO marco_legal (id_proceso, nom_marco, dir_marco, carp_marco, file_marco, id_vista ) 
     VALUES ( '${id_proceso}', '${nom_marco}', '${file}', 0 , '${id_marco}', 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                  res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });






module.exports=router;