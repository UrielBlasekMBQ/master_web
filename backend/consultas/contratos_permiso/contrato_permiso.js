const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get 
router.get('/get_contrato_permiso',(req, res)=>{
    let sql ='select * from contrato_permiso'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//Update multi proceso 
router.post('/update_contrato_permiso',(req, res)=>{
    const {contrato_estatus}= req.body;
    let sql =`UPDATE contrato_permiso SET contrato_estatus = '${contrato_estatus}'`
    conexion.query(sql,(err, rows, fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Cambio de configuración', ok : true});
        }
    })

})




module.exports=router;