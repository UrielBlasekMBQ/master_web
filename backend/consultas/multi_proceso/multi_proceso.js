const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get 
router.get('/get_multi_proceso',(req, res)=>{
    let sql ='select * from config_procesos'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//Update multi proceso 
router.post('/update_multi_proceso',(req, res)=>{
    const {multi_proceso}= req.body;
    let sql =`UPDATE config_procesos SET multi_proceso = '${multi_proceso}'`
    conexion.query(sql,(err, rows, fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Cambio de configuración', ok : true});
        }
    })

})



//Agregar usuario
router.post('/',(req,res)=>{
    const{usuario,nombre,apellidos,email,departamento,tipoUsuario,password,estatus,foto} = req.body;

    let sql =  `INSERT INTO usuarios ( usuario, nombre, apellidos, email, departamento, tipoUsuario, password, estatus, foto) 
    VALUES ( '${usuario}', '${nombre}', '${apellidos}', '${email}', '${departamento}', '${tipoUsuario}', '${password}', '${estatus}', '${foto}')` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'usuairo agregago'});
        }
    });
    
})
 

module.exports=router;