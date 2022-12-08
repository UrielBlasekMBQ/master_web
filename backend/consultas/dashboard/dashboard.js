const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// get un usuario
//--------------------------

router.post('/documentos',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT ac.*,  
    autor.nombre AS nom_autor, autor.apellidos AS apell_autor,
    interno.nombre AS nom_interno, interno.apellidos AS ape_interno,
    externo.nombre AS nom_externo, externo.apellidos AS ape_externo,
    proc.departamento
    FROM acompanamiento ac
    JOIN usuarios autor ON autor.id_usuario = ac.id_usuario
    JOIN usuarios interno ON interno.id_usuario = ac.id_revisor_interno
    JOIN usuarios externo ON externo.id_usuario = ac.id_revisor_externo
    JOIN procesos proc ON proc.id_proceso  = ac.id_proceso
    WHERE (ac.id_revisor_interno = '${id_usuario}' OR ac.id_revisor_externo = '${id_usuario}' ) 
    AND (ac.revision_interna = 1 OR ac.revision_externa = 1 OR ac.revision_externa = 0 ) `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

//Resoltados
router.post('/documentosResultados',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT ac.*,  
    autor.nombre AS nom_autor, autor.apellidos AS apell_autor,
    interno.nombre AS nom_interno, interno.apellidos AS ape_interno,
    externo.nombre AS nom_externo, externo.apellidos AS ape_externo,
    proc.departamento
    FROM acompanamiento ac
    JOIN usuarios autor ON autor.id_usuario = ac.id_usuario
    JOIN usuarios interno ON interno.id_usuario = ac.id_revisor_interno
    JOIN usuarios externo ON externo.id_usuario = ac.id_revisor_externo
    JOIN procesos proc ON proc.id_proceso  = ac.id_proceso
    WHERE (revision_interna = 3 OR revision_externa = 3 OR revision_interna = 4 OR revision_externa = 4 OR revision_interna = 1 OR revision_externa = 1)
    AND ac.id_usuario = '${id_usuario}'  
    `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

// Aprueba documentos
router.post('/docaprueba',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT da.*,
    autor.nombre AS nom_autor, autor.apellidos AS apell_autor,
    vig.nom_vigencia
    FROM document_asignado da
    JOIN vigencias vig ON vig.id_vigencia = da.vigencia
    JOIN usuarios autor ON autor.id_usuario = da.id_usuario
    WHERE aprueba_document = '${id_usuario}' AND aprobado = 0 `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})


// Revisa documentos
router.post('/docrevisa',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT da.*,
    autor.nombre AS nom_autor, autor.apellidos AS apell_autor,
    vig.nom_vigencia
    FROM document_asignado da
    JOIN vigencias vig ON vig.id_vigencia = da.vigencia
    JOIN usuarios autor ON autor.id_usuario = da.id_usuario
    WHERE revisa_document = '${id_usuario}' AND revisado = 0 `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

// Get AMEF
router.post('/getamef',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT plan.*, usu.nombre, usu.apellidos,
    proce.departamento
    FROM amef_planificacion plan 
    JOIN usuarios usu ON usu.id_usuario = plan.id_usuario
    JOIN procesos proce ON proce.id_proceso = plan.id_proceso 
    WHERE plan.id_usuario = '${id_usuario}' AND plan.amef_planifica_estatus = 0 `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})



module.exports=router;