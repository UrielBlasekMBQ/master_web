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

//     const path1 = path.join(__dirname , `../../uploads/marco_legal/${req.params.filename}`)
    
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
    
    const {id_marco, id_proceso} = req.body
    let sql = `SELECT * FROM marco_legal WHERE id_proceso = '${id_proceso}' AND file_marco ='${id_marco}' `;
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
    let sql = `SELECT * FROM marco_legal WHERE id_proceso = '${id}' AND carp_marco = 1 ` ;
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

    const { id_proceso, nom_marco}= req.body;

     let sql =  `INSERT INTO marco_legal (id_proceso, nom_marco, carp_marco, file_marco, id_vista ) 
     VALUES ( '${id_proceso}', '${nom_marco}', 1 , 0, 0) ` ;

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
    
    const {id_marco} = req.body
    let sql = `SELECT * FROM marco_legal WHERE id_marco ='${id_marco}'  OR file_marco ='${id_marco}' `;
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
    const{dir_marco} = req.body;
    
    fs.unlink(`./uploads/marco_legal/${dir_marco}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});

//Eliminar documento de hijo

router.post('/deletedocumentohijo',(req,res)=>{
    const{dir_marco} = req.body;
    
    fs.unlink(`./uploads/marco_legal/hijos/${dir_marco}`, (err)=>{
        
    });
    res.json({status: 'se elimino file'});
});



router.post('/deletepadreshijos',(req,res)=>{
    const {id_marco}= req.body;

    let sql=`DELETE FROM marco_legal WHERE id_marco = '${id_marco}'  OR file_marco ='${id_marco}'`;


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
    const {id_marco}= req.body;

    let sql=`DELETE FROM marco_legal WHERE id_marco = '${id_marco}' `;


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