const router = require('express').Router()

const conexion = require('../../config/conexion');



// Asignamos todas las rutas
//Get Equipos
  // get revisores
  router.get('/revisores',(req,res)=>{
    let sql = ` SELECT usu.* 
    FROM usuarios usu 
    JOIN permisos perm ON usu.id_usuario = perm.id_usuario
    WHERE perm.revisaRevisar = 1 ` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})


  // get revisores documentos
  router.post('/documentos',(req,res)=>{
    const {id_usuario, id_proceso} = req.body
    let sql = ` SELECT * FROM document_asignado ad
    JOIN usuarios us ON us.id_usuario = ad.id_usuario
    JOIN vigencias vig ON vig.id_vigencia  = ad.vigencia
    WHERE revisa_document = '${id_usuario}' AND id_proceso = '${id_proceso}'` ;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})
 

//Modimficar Documentos
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{revisado} = req.body;
    
    let sql =`UPDATE document_asignado SET revisado = '${revisado}' 
    WHERE id_documentAsig  = '${id}'` 

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