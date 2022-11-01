const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get Grupo de trabajo
router.post('/get-grupo',(req, res)=>{
    const{departamento} = req.body;
    let sql =`SELECT *
     FROM logs_procesos log
     JOIN usuarios us ON us.id_usuario = log.id_usuario
     WHERE id_proceso = '${departamento}' AND  us.estatus =1 `;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//get Efectos 
router.get('/get-efectos',(req, res)=>{
    
    let sql ='SELECT * FROM efecto_potencial';
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

///////// Probabilidad ////////
//get 
router.get('/get-probabilidad',(req, res)=>{
    
    let sql ='SELECT * FROM ocu_probabilidad';
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})
//get 
router.get('/get-gravedad',(req, res)=>{
    
    let sql ='SELECT * FROM ocu_gravedad';
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})
//get 
router.get('/get-determinacion',(req, res)=>{
    
    let sql ='SELECT * FROM ocu_deteccion';
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


///////// Probabilidad ////////


//get 
router.get('/get-estatus',(req, res)=>{
    
    let sql ='SELECT * FROM amef_estatus';
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

 

// get un usuario
//--------------------------

router.get('/:id',(req,res)=>{
    const {id} = req.params
    let sql = `SELECT * FROM usuarios u JOIN procesos p ON u.departamento = p.id_proceso JOIN tipousuarios t ON u.tipoUsuario =  t.id_cat_usuarios WHERE p.id_proceso = '${id}' `;
    conexion.query(sql,[id],(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
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
 

//Modimficar
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{usuario,nombre,apellidos,email,departamento,tipoUsuario,password,estatus} = req.body;
    let sql =`UPDATE usuarios SET  usuario = '${usuario}', nombre = '${nombre}', apellidos = '${apellidos}', email = '${email}', departamento = '${departamento}', tipoUsuario = '${tipoUsuario}', password = '${password}', estatus = '${estatus}' WHERE id_usuario = '${id}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'usuairo modificado'});
        }
    });
})


//Eliminar 

router.delete('/:id', (req, res) =>{
    const {id} =req.params;
    let sql=`DELETE FROM usuarios WHERE id_usuario= '${id}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'usuario editado'});
        }
    });
    
});

// get un usuario
//--------------------------

router.post('/datos',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT *
     FROM usuarios u 
     JOIN procesos p ON u.departamento = p.id_proceso 
     JOIN tipousuarios t ON u.tipoUsuario =  t.id_cat_usuarios 
     WHERE u.id_usuario = '${id_usuario}' `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})



module.exports=router;