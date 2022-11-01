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

    const path1 = path.join(__dirname , `../../uploads/capacitacion_legal/hijos/${req.params.filename}`)
    
    if (fs.existsSync(path1)) {
        res.contentType("application/pdf");
        fs.createReadStream(path1).pipe(res)
        fs.createReadStream(path1).pipe(res);
    } else {
        res.status(500)
        
        res.send('File not found')
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
      cb(null, `./uploads/capacitacion_legal/hijos`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const { id_proceso, nom_capacitacion, id_capacitacion}= req.body;
    

     let sql =  `INSERT INTO capacitacion_legal (id_proceso, nom_capacitacion, dir_capacitacion, carp_capacitacion, file_capacitacion, id_vista ) 
     VALUES ( '${id_proceso}', '${nom_capacitacion}', '${file}', 0 , '${id_capacitacion}', 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                  res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });






module.exports=router;