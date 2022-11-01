const router = require('express').Router()

const multer =require('multer');
const fs = require('fs');
const conexion = require('../../config/conexion');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');
const jwt =require('jsonwebtoken');



// Asignamos todas las rutas
//Get 

//get 
router.get('/',(req, res)=>{
    let sql =`select * from usuarios us
                JOIN procesos proce ON  proce.id_proceso = us.departamento
                JOIN tipousuarios tipo ON tipo.id_cat_usuarios  = us.tipoUsuario where us.id_usuario >1`;
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
    let sql = `SELECT * 
    FROM usuarios u 
    JOIN procesos p ON u.departamento = p.id_proceso 
    JOIN tipousuarios t ON u.tipoUsuario =  t.id_cat_usuarios 
    WHERE p.id_proceso = '${id}'  AND u.id_usuario >1`;
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
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
})
 

//Modimficar
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{usuario,nombre,apellidos,email,departamento,tipoUsuario,password,estatus} = req.body;
    let sql =`UPDATE usuarios SET  usuario = '${usuario}', nombre = '${nombre}', apellidos = '${apellidos}', email = '${email}', departamento = '${departamento}', tipoUsuario = '${tipoUsuario}', password = '${password}', estatus = '${estatus}' WHERE id_usuario = '${id}'`

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
})


//Eliminar 

router.delete('/:id', (req, res) =>{
    const {id} =req.params;
    let sql=`DELETE FROM usuarios WHERE id_usuario= '${id}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
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


// Agregar multiples procesos
router.post('/procesos',(req,res)=>{
    const {id_usuario, id_proceso} = req.body
    let sql = `INSERT INTO logs_procesos(id_usuario, id_proceso) 
    VALUES('${id_usuario}','${id_proceso}')`;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            if (err) { 
                res.json({msg: err, ok : false});
            }
            else{
                res.json({msg: 'Carpeta eliminada', ok : true});
            }
        }
    });
})


// mandar procesos para edicion 
router.post('/get_procesos',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT pros.*
     FROM logs_procesos logper
     JOIN procesos pros ON pros.id_proceso = logper.id_proceso
     WHERE logper.id_usuario ='${id_usuario}' and estatus_proceso = 1
     order by pros.id_proceso`;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

//Eliminar procesos

router.post('/delete_procesos', (req, res) =>{
    const {id_usuario} =req.body;
    let sql=`DELETE FROM logs_procesos WHERE id_usuario= '${id_usuario}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            if (err) { 
                res.json({msg: err, ok : false});
            }
            else{
                res.json({msg: 'Carpeta eliminada', ok : true});
            }
        }
    });
    
});

//Eliminar Permisos

router.post('/delete_permisos', (req, res) =>{
    const {id_usuario} =req.body;
    let sql=`DELETE FROM permisos WHERE id_usuario= '${id_usuario}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    });
    
});

//Get un usuario
router.post('/get_un_usuario', (req, res) =>{
    const {id_usuario} =req.body;
    let sql=`SELECT * 
            FROM usuarios u 
            JOIN procesos p ON u.departamento = p.id_proceso 
            JOIN tipousuarios t ON u.tipoUsuario =  t.id_cat_usuarios 
            WHERE u.id_usuario = '${id_usuario}' `;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json(rows);
        }
    });
    
});

//Cambio de contraseña

router.post('/cambio_contrasena', (req, res) =>{
    const {id_usuario, password} =req.body;
    let sql=`UPDATE usuarios SET password = '${password}' WHERE id_usuario = '${id_usuario}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Actualizado', ok : true});
        }
    });
    
});

//Cambio de email
router.post('/cambio_email', (req, res) =>{
    const {id_usuario, email} =req.body;
    let sql=`UPDATE usuarios SET email = '${email}' WHERE id_usuario = '${id_usuario}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Actualizado', ok : true});
        }
    });
    
});

//Cambio de nombre y apellidos
router.post('/cambiar_anombre_apellidos', (req, res) =>{
    const {id_usuario, nombre, apellidos} =req.body;
    let sql=`UPDATE usuarios SET nombre = '${nombre}', apellidos = '${apellidos}' WHERE id_usuario = '${id_usuario}'`;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Actualizado', ok : true});
        }
    });
    
});



// Creacion de documentos
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); 
      const fileName = Date.now(); 
      cb(null, `${fileName}.${ext}`); 
    },
    destination: function (res, file, cb) {
      cb(null, `./uploads/foto_perfil`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/cambio_perfil", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const {id_usuario}= req.body;
    

     let sql =  `UPDATE usuarios SET foto = '${file}' WHERE id_usuario ='${id_usuario}'` ;

            conexion.query(sql,(err,rows,fields)=>{
                if (err) { 
                    res.json({msg: err, ok : false});
                }
                else{
                    res.json({msg: 'Carpeta eliminada', ok : true});
                }
            });
  });







module.exports=router;  