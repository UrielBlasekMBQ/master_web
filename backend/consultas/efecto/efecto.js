const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get 
router.get('/',(req, res)=>{
    let sql ='select * from efecto_potencial'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


//Agregar usuario
router.post('/addefecto',(req,res)=>{
    const{nom_efecto} = req.body;

    let sql =  `INSERT INTO efecto_potencial (nom_efecto ) 
    VALUES ( '${nom_efecto}')` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'efecto agregado'});
        }
    });
    
})
 

//Modimficar
router.put('/updateefecto',(req,res)=>{

    const{id_efecto , nom_efecto} = req.body;
    let sql =`UPDATE efecto_potencial SET  nom_efecto = '${nom_efecto}' WHERE id_efecto = '${id_efecto}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'efecto modificado'});
        }
    });
})


//Eliminar 

router.post('/deleteefecto', (req, res) =>{
    const {id_efecto} =req.body;
    let sql=`DELETE FROM efecto_potencial WHERE id_efecto= '${id_efecto}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'efecto Eliminado'});
        }
    });
    
});



module.exports=router;