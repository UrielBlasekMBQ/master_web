const router = require('express').Router()

const conexion = require('../../config/conexion');



// Asignamos todas las rutas
//Get Equipos

//get equipos
router.get('/',(req, res)=>{
    let sql ='select * from procesos order by id_proceso '
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


// get un proceso
//--------------------------

router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = 'SELECT * FROM procesos WHERE id_proceso =? order by id_proceso';
    conexion.query(sql,[id],(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

//Agregar Proceo
router.post('/',(req,res)=>{
    const{departamento,direccion, descripcion, estatus_proceso} = req.body;

    let sql =  `INSERT INTO procesos (departamento,direccion,descripcion, estatus_proceso) 
    VALUES ('${departamento}','${direccion}', '${descripcion}', '${estatus_proceso}' )` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})
 

//Modimficar proceso
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{departamento, direccion, descripcion, estatus_proceso} = req.body;
    let sql =`UPDATE procesos SET departamento = '${departamento}',
              direccion = '${direccion}', descripcion = '${descripcion}' , estatus_proceso = '${estatus_proceso}'
    WHERE id_proceso = '${id}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
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

//Agregar Proceo
router.post('/proceso',(req,res)=>{
    const{id_proceso} = req.body;

    let sql =  `SELECT * FROM procesos WHERE id_proceso ='${id_proceso}' order by id_proceso` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
    
})




module.exports=router;