const router = require('express').Router()

const conexion = require('../../config/conexion');



// Asignamos todas las rutas
//Get Equipos

//get equipos
router.get('/',(req, res)=>{
    let sql ='select * from vigencias'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})



module.exports=router;