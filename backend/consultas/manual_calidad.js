const router = require('express').Router()

const multer =require('multer');
const fs = require('fs');
const conexion = require('../config/conexion');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');


// Asignamos todas las rutas
//Get 

//get Documentos
// router.get('/:filename',async(req, res)=>{


    // var file = path.join(__dirname, '../uploads/1662623702408.pdf');
    // res.download(file, function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });

//     const path1 = path.join(__dirname , `../uploads/${req.params.filename}`)
    
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

//Get documento
router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = `SELECT * FROM manual_calidad ` ;
    conexion.query(sql,[id],(err,rows,fields)=>{
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
  

     let sql =  `INSERT INTO document_asignado (id_usuario, nombreProceso, tipoDocument, nom_document, vigencia, fecha_creacion, revisa_document, aprueba_document, documento, revisado,aprobado ) 
     VALUES ( '${generausuario}', '${nombreProceso}', '${tipoDocumento}', '${nombreDocumento}', '${vigencia}', '${fecha_creacion}', '${revisa_document}', '${aprueba_document}', '${file}', 0,0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                    res.json({status: 'proceso agregago'});
                }
            });
  });


// get un proceso
//--------------------------

// router.get('/:id',(req,res)=>{
//     const {id} = req.params
//     let sql = 'SELECT * FROM procesos WHERE id_proceso =? ';
//     conexion.query(sql,[id],(err,rows,fields)=>{
//         if (err) { throw err
            
//         }
//         else{
//             res.json(rows);
//         }
//     });
// })

//Agregar Proceo
// router.post('/',(req,res)=>{
//     const{departamento,direccion, descripcion} = req.body;

//     let sql =  `INSERT INTO procesos (departamento,direccion,descripcion) 
//     VALUES ('${departamento}','${direccion}', '${descripcion}' )` ;

//     conexion.query(sql,(err,rows,fields)=>{
//         if (err) { throw err
            
//         }
//         else{
//             res.json({status: 'proceso agregago'});
//         }
//     });
    
// })
 

//Modimficar proceso
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{departamento, direccion, descripcion} = req.body;
    let sql =`UPDATE procesos SET departamento = '${departamento}', direccion = '${direccion}', descripcion = '${descripcion}'
    WHERE id_proceso = '${id}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'proceso modificado'});
        }
    });
})


//Eliminar proceso

router.delete('/:id', (req, res) =>{
    const {id} =req.params;
    let sql=`DELETE FROM procesos WHERE id_proceso= '${id}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'proceso eliminado'});
        }
    });
    
});




module.exports=router;