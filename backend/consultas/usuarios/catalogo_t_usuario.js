const router = require('express').Router()

const conexion = require('../../config/conexion');



// Asignamos todas las rutas
//Get Equipos

//get equipos
router.post('/',(req, res)=>{
    const {tipoUsurio}= req.body;
    let sql = `SELECT * 
                FROM tipousuarios
                WHERE id_cat_usuarios >'${tipoUsurio}'`;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})



module.exports=router;