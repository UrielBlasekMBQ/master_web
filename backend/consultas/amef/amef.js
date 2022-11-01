const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas


//Agregar Planificacion
router.post('/add_planificacion',(req,res)=>{
    const{id_proceso,id_usuario,amef_modelo,amef_componente_eva,amef_componente_func} = req.body;

    let sql =  `INSERT INTO amef_planificacion 
    ( id_proceso, id_usuario, amef_modelo, amef_componente_eva, amef_componente_func, amef_planifica_estatus) 
 VALUES ( '${id_proceso}', '${id_usuario}', '${amef_modelo}', '${amef_componente_eva}', '${amef_componente_func}', 0)` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

//get Grupo de trabajo
router.post('/get_amefTable',(req, res)=>{
    const{id_proceso, id_usuario} = req.body;
    let sql =`SELECT amef_p.*, usu.nombre, usu.apellidos, pros.departamento
    FROM amef_planificacion amef_p
    JOIN usuarios usu ON usu.id_usuario = amef_p.id_usuario
    JOIN procesos pros ON pros.id_proceso = amef_p.id_proceso
    WHERE amef_p.id_proceso = '${id_proceso}' and amef_p.id_usuario = '${id_usuario}'`;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//Agregar un grupo de trabajo 
router.post('/add_grupo_trabajo',(req,res)=>{
    const{id_amef_planificacion,id_usuario} = req.body;

    let sql =  `INSERT INTO grupo_trabajo (id_amef_planificacion, id_usuario) 
    VALUES ( '${id_amef_planificacion}', '${id_usuario}')` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

// Get data de Amef

//get Grupo de trabajo
router.post('/get_data_amef',(req, res)=>{
    const{id_amef_planificacion} = req.body;
    let sql =`SELECT amef.*, efecto.nom_efecto,
    probabilidad.val_probabilidad, probabilidad.nom_probabilidad, 
    gravedad.val_gravedad, gravedad.nom_gravedad, 
    deteccion.val_determinacion, deteccion.nom_determinacion 
    FROM amef_amef amef
    JOIN efecto_potencial efecto ON efecto.id_efecto = amef.id_efecto
    JOIN ocu_probabilidad probabilidad ON probabilidad.id_probabilidad = amef.id_probabilidad 
    JOIN ocu_gravedad gravedad ON gravedad.id_gravedad = amef.id_gravedad
    JOIN ocu_deteccion deteccion ON deteccion.id_deteccion = amef.id_deteccion
    WHERE amef.id_amef_planificacion = '${id_amef_planificacion}'`;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})


//Agregar data amef 
router.post('/add_data_amef',(req,res)=>{
    const{id_amef_planificacion,amef_modelo_fallo, id_efecto, id_probabilidad,
         id_gravedad, id_deteccion, rpn_amef, clasificacion_amef, planificacion_amef } = req.body;

    let sql =  `INSERT INTO amef_amef (id_amef_planificacion,amef_modelo_fallo, id_efecto, id_probabilidad,
        id_gravedad, id_deteccion, rpn_amef, clasificacion_amef, planificacion_amef, ac ) 
    VALUES ( '${id_amef_planificacion}','${amef_modelo_fallo}','${id_efecto}','${id_probabilidad}','${id_gravedad}',
            '${id_deteccion}','${rpn_amef}','${clasificacion_amef}','${planificacion_amef}', 0
        )` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

//Actializa data amef 
router.post('/update_data_amef',(req,res)=>{
const{id_amef_amef,amef_modelo_fallo,id_efecto,id_probabilidad,
    id_gravedad,id_deteccion,rpn_amef,clasificacion_amef, planificacion_amef } = req.body;
         let sql = `UPDATE amef_amef SET amef_modelo_fallo ='${amef_modelo_fallo}',
         id_efecto ='${id_efecto}', id_probabilidad ='${id_probabilidad}',
         id_gravedad ='${id_gravedad}', id_deteccion ='${id_deteccion}',
         rpn_amef ='${rpn_amef}', clasificacion_amef ='${clasificacion_amef}',
         planificacion_amef ='${planificacion_amef}'

         WHERE id_amef_amef  = '${id_amef_amef}' `;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})

//Delete una Modelo de fallo 
router.post('/delete_data_amef',(req,res)=>{
    const{id_amef_amef} = req.body;

    let sql =  `DELETE FROM amef_amef WHERE id_amef_amef = '${id_amef_amef}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows)
        }
    });
    
})

// fase 2
router.post('/update_fase2',(req,res)=>{
    const{id_amef_planificacion } = req.body;
             let sql = `UPDATE amef_planificacion SET amef_planifica_estatus= 1
    
             WHERE id_amef_planificacion  = '${id_amef_planificacion}' `;
    
        conexion.query(sql,(err,rows,fields)=>{
            if (err) { throw err
                
            }
            else{
                res.json({status: 'se actualizo data'});
            }
        });
        
    })


/// get modelos ac 
router.post('/get_modelo_ac',(req, res)=>{
    const{id_amef_planificacion} = req.body;
    let sql =`SELECT amef.*
    FROM amef_amef amef
    WHERE id_amef_planificacion= '${id_amef_planificacion}' AND ac =0 `;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//Listado de responsables
router.post('/get_respon_reg',(req, res)=>{
    const{id_amef_planificacion} = req.body;
    let sql =`SELECT gt.*, us.nombre, us.apellidos
    FROM grupo_trabajo gt
    JOIN usuarios us ON us.id_usuario = gt.id_usuario 
    WHERE gt.id_amef_planificacion = '${id_amef_planificacion}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    }) 

})

// Listado de acciones correctivas 

router.post('/get_acciones_correctivas',(req, res)=>{
    const{id_amef_planificacion} = req.body;
    let sql =`SELECT ac.*, amef.planificacion_amef,
    usu.nombre, usu.apellidos
    FROM amef_ac ac
    JOIN amef_amef amef ON amef.id_amef_amef  = ac.id_amef_amef  
    JOIN usuarios usu ON usu.id_usuario = ac.id_grupo_trabajo 
    WHERE ac.id_amef_planificacion = '${id_amef_planificacion}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//add accion correctiva
router.post('/add_modelo_ac',(req,res)=>{
    const{ id_amef_amef , id_amef_planificacion, id_grupo_trabajo, ac_fech_inicio, ac_fech_final, 
        ac_final, ac_programado, ac_elaborado, id_amef_estatus
    } = req.body;

    let sql =  `INSERT INTO amef_ac (id_amef_amef , id_amef_planificacion, id_grupo_trabajo, ac_fech_inicio, ac_fech_final, 
        ac_final, ac_programado, ac_elaborado, id_amef_estatus ) 
    VALUES ( '${id_amef_amef }', '${id_amef_planificacion}', '${id_grupo_trabajo}', '${ac_fech_inicio}',
     '${ac_fech_final}',  '${ac_final}', '${ac_programado}', '${ac_elaborado}', '${id_amef_estatus}'
        )` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})

// Update accion correctiva
router.post('/update_acciones_correctivas',(req, res)=>{
    const{ id_ac_amef, id_grupo_trabajo, ac_fech_inicio, 
        ac_fech_final, ac_final, ac_programado, ac_elaborado,
         id_amef_estatus
    } = req.body;
    let sql =`UPDATE amef_ac SET     
    id_grupo_trabajo = '${id_grupo_trabajo}',
    ac_fech_inicio = '${ac_fech_inicio}',
    ac_fech_final = '${ac_fech_final}',
    ac_final = '${ac_final}',
    ac_programado = '${ac_programado}',
    ac_elaborado = '${ac_elaborado}',
    id_amef_estatus = '${id_amef_estatus}'
    WHERE id_ac_amef = '${id_ac_amef}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })

})


// Update Model de fallo
router.post('/update_modelo_ac_mod',(req, res)=>{
    const{id_amef_amef } = req.body;
    let sql =`UPDATE amef_amef SET ac = 1 WHERE id_amef_amef = '${id_amef_amef}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })

})



// Update Model de fallo
router.post('/update_fase3',(req, res)=>{
    const{id_amef_planificacion } = req.body;
    let sql =`UPDATE amef_planificacion SET amef_planifica_estatus = 2

    WHERE id_amef_planificacion  = '${id_amef_planificacion}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })

})

/////////////// SEGUIMIENTO ///////////////
router.post('/ga_grupo_trabajo_def',(req, res)=>{
    const{id_amef_planificacion} = req.body;
    let sql =`SELECT *
    FROM grupo_trabajo gt
    JOIN usuarios us ON us.id_usuario = gt.id_usuario
    WHERE gt.id_amef_planificacion = '${id_amef_planificacion}' `;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})
/////////////// SEGUIMIENTO ///////////////




module.exports=router;