const router = require('express').Router()

const multer =require('multer');
const fs = require('fs');
const conexion = require('../../config/conexion');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');


// Creacion de documentos
  router.put("/", (req, res) => {

    const { nom_registro, nivel_carpeta, carp_padre}= req.body;

     let sql =  `INSERT INTO registros ( nom_registro, carp_registro, file_registro, nivel_carpeta, carp_padre, id_vista ) 
     VALUES ( '${nom_registro}', 1 , 0, '${nivel_carpeta}', '${carp_padre}', 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { 
                    res.json({msg: err, ok : false});
                }
                else{
                    res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });


  

//Get Hijos
router.post('/hijos',(req,res)=>{
    
    const {id_registro} = req.body
    let sql = `SELECT * FROM registros WHERE  carp_padre ='${id_registro}' `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows); 
        }
    });
    
})


//Get Get Padres
router.get('/padres',(req,res)=>{

    let sql = `SELECT * FROM registros WHERE carp_registro = 1 AND carp_padre = 0` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        } 
        else{
            res.json(rows);
        }
    });
})


 //Modimficar
 router.put('/padresEdit',(req,res)=>{
    const {id}= req.params;
    const{id_registro,nom_registro} = req.body;
    let sql =`UPDATE registros SET nom_registro = '${nom_registro}'  WHERE id_registro = '${id_registro}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
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
      cb(null, `./uploads/registro_legal/hijos`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/addhijos", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const {nom_registro, file_registro, nivel_carpeta, carp_padre}= req.body;    

     let sql =  `INSERT INTO registros ( nom_registro, dir_registro, carp_registro, file_registro, nivel_carpeta, carp_padre, id_vista ) 
     VALUES ('${nom_registro}', '${file}', 0 , '${file_registro}', '${nivel_carpeta}', '${carp_padre}', 0) ` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                  res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });

 
  /////////// Eliminar  /////////////////////////

  // Eliminacion padre he hijos 
  router.post('/getpadrehijo',(req,res)=>{
    
    const {id_registro} = req.body
    let sql = `SELECT * FROM registros WHERE id_registro ='${id_registro}'  OR file_registro ='${id_registro}' `;
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
    const{dir_registro} = req.body;
    
    fs.unlink(`./uploads/registro_legal/${dir_registro}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});

//Eliminar documento de hijo

router.post('/deletedocumentohijo',(req,res)=>{
    const{dir_registro} = req.body;
    
    fs.unlink(`./uploads/registro_legal/hijos/${dir_registro}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});



router.post('/deletepadreshijos',(req,res)=>{
    const {id_registro}= req.body;

    let sql=`DELETE FROM registros WHERE id_registro = '${id_registro}' `;


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
    const {id_registro}= req.body;

    let sql=`DELETE FROM registros WHERE id_registro = '${id_registro}' `;


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




module.exports=router;