const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get 
router.get('/',(req, res)=>{
    let sql ='select * from usuarios'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


// get historial
//--------------------------

// get historial
router.post('/historial',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT hist.*, us.nombre, us.apellidos
    FROM historial hist
    JOIN usuarios us ON us.id_usuario = hist.id_usuario
    WHERE hist.id_usuario = '${id_usuario}' 
    ORDER BY id_historial DESC`;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

// Add historia
router.post('/add_historial',(req,res)=>{
    const {id_usuario, modulo_acceso, fecha_actual} = req.body
    let sql = `INSERT INTO historial (id_usuario, modulo_acceso, fecha_actual)
                VALUE(
                    '${id_usuario}',                    
                    '${modulo_acceso}',
                    '${fecha_actual}'
                    ) `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'Se agrego historial'});
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