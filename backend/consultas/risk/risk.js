const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');


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

//get equipos
router.get('/allRisk',(req, res)=>{
    let sql =`select ris.*,
    aut.nombre AS nom_autor, aut.apellidos AS apell_autor,
    respon.nombre AS nom_responde, respon.apellidos AS apell_responde
     from risk ris
     JOIN usuarios aut ON aut.id_usuario = ris.id_autor
     JOIN usuarios respon ON respon.id_usuario = ris.id_responde` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//get Usuarios por procesos
router.post('/usuarioResponde',(req, res)=>{
    const{id_proceso} = req.body;
    let sql = ` SELECT * 
    FROM logs_procesos logs
    JOIN usuarios usu ON usu.id_usuario = logs.id_usuario
    WHERE  (usu.tipoUsuario =2 OR usu.tipoUsuario =3)
     AND logs.id_proceso = '${id_proceso}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


//Listado de risk por usuarios
router.post('/listRisk',(req, res)=>{
    const{id_usuario} = req.body;
    let sql = ` SELECT ris.*,
    aut.nombre AS nom_autor, aut.apellidos AS apell_autor,
    respon.nombre AS nom_responde, respon.apellidos AS apell_responde
    FROM risk ris
    JOIN usuarios aut ON aut.id_usuario = ris.id_autor
    JOIN usuarios respon ON respon.id_usuario = ris.id_responde
    WHERE id_responde = '${id_usuario}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


//Listado de risk por usuarios
router.post('/listRiskUsuario',(req, res)=>{
    const{id_usuario} = req.body;
    let sql = ` SELECT ris.*,
    aut.nombre AS nom_autor, aut.apellidos AS apell_autor,
    respon.nombre AS nom_responde, respon.apellidos AS apell_responde
    FROM risk ris
    JOIN usuarios aut ON aut.id_usuario = ris.id_autor
    JOIN usuarios respon ON respon.id_usuario = ris.id_responde
    WHERE id_autor = '${id_usuario}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


//Geenera risk
router.post('/generaRisk',(req, res)=>{
    const{id_autor, id_responde, fecha} = req.body;
    let sql = ` INSERT INTO risk (id_autor, id_responde, estatus, fecha, group1, group2, group3, group4, group5, group6, group7, group8, group9, group10, group11, group12, group13, group14, group15, group16, group17,
         group18, group19, group20, group21, group22, group23, group24, group25, group26, group27, group28, group29) 
         VALUES ('${id_autor}', '${id_responde}', 0, '${fecha}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)` ;

        conexion.query(sql,(err,rows,fields)=>{
            if (err) { 
                res.json({msg: err, ok : false});
            }
            else{
                res.json({msg: 'Carpeta eliminada', ok : true});
            }
        });
})

// Genera tokn para Risk

//Agregar usuario
router.post('/generaTokenRisk',(req,res)=>{
    const {id_risk, id_responde} =req.body;

    let id_risk1 = `${id_risk}`;
    let id_responde1 = `${id_responde}`;

    let usuario = {
    id_risk1 : id_risk1, 
    id_responde1 : id_responde1
    }

    let sql =`SELECT id_risk, id_responde
     FROM risk  
     WHERE id_risk='${id_risk}' and id_responde = '${id_responde}' `;
    conexion.query(sql,(err,rows,fileds)=>{
        if (err) { 
            
        }
        else{
            
            if(rows.length >0){

                //console.log(id_risk1, id_responde1);
                
                let data =JSON.stringify(rows[0]);
                jwt.sign(usuario, 'master_web',{expiresIn: '300s'}, (err, token)=>{
                    res.json({token});
                });

            }else{
                res.json(rows);
            }
        }
    });
    
})


// Genera tokn para Risk
router.post('/generaTokenRiskAdmin',(req,res)=>{
    const {id_risk, id_autor} =req.body;

    let id_risk1 = `${id_risk}`;
    let id_autor1 = `${id_autor}`;

    let usuario = {
    id_risk1 : id_risk1, 
    id_autor1 : id_autor1
    }

    let sql =`SELECT id_risk, id_autor
     FROM risk  
     WHERE id_risk='${id_risk}' and id_autor = '${id_autor}' and estatus = 0 `;
    conexion.query(sql,(err,rows,fileds)=>{
        if (err) { 
            console.log('error');
        }
        else{
            
            if(rows.length >0){

                //console.log(id_risk1, id_responde1);
                
                let data =JSON.stringify(rows[0]);
                jwt.sign(usuario, 'master_web',{expiresIn: '300s'}, (err, token)=>{
                    //console.log(token);
                    res.json({token});
                });

            }else{
                res.json(rows);
                //console.log(1);
            }
        }
    });
    
})

// Genera tokn para Risk
router.post('/generaTokenRiskAdministrador',(req,res)=>{
    const {id_risk} =req.body;

    let id_risk1 = `${id_risk}`;
    

    let usuario = {
    id_risk1 : id_risk1
    }

    let sql =`SELECT id_risk, id_autor
     FROM risk  
     WHERE id_risk='${id_risk}' and estatus = 1 `;
    conexion.query(sql,(err,rows,fileds)=>{
        if (err) { 
        }
        else{
            if(rows.length >0){
                //console.log(id_risk1, id_responde1);
                let data =JSON.stringify(rows[0]);
                jwt.sign(usuario, 'master_web',{expiresIn: '300s'}, (err, token)=>{
                    res.json({token});
                });

            }else{
                res.json(rows);
            }
        }
    });
    
})




/// Validacion de token Responde
router.post('/validaToken',(req,res)=>{
    const {token, id_risk, id_responde} =req.body;
    const token_risk = `${token}`;
    const id_risk1 = `${id_risk}`;
    const id_responde1 = `${id_responde}`;
    // console.log(token_risk);
    // console.log(id_risk1);
    //console.log(id_responde1);

    try {
        //console.log(token_risk);
        if (`${token}`!=='') {
            const content= jwt.verify(token_risk,'master_web');
            req.data=content;
            //console.log(req.data);
            if (id_risk1 == req.data.id_risk1 && id_responde1 == req.data.id_responde1) {
                res.json({"respuesta" : true});
            }else{
                res.json({"respuesta" : false});
            }
        }else{
            res.status(401).json('Token vacio');
        }
    
    } catch (error) {
        res.json({"respuesta" : "expiro"});
    }

    
    //res.json(req.data);
});


/// Validacion de token Genera
router.post('/validaTokenRiskGenera',(req,res)=>{
    const {token, id_risk, id_autor} =req.body;
    const token_risk = `${token}`;
    const id_risk1 = `${id_risk}`;
    const id_autor1 = `${id_autor}`;
    // console.log(token_risk);
    // console.log(id_risk1);
    // console.log(id_autor1);

    try {
        //console.log(token_risk);
        if (`${token}`!=='') {
            const content= jwt.verify(token_risk,'master_web');
            req.data=content;
            // console.log(req.data);
            if (id_risk1 == req.data.id_risk1 && id_autor1 == req.data.id_autor1) {
                res.json({"respuesta" : true});
            }else{
                res.json({"respuesta" : false});
            }
        }else{
            res.status(401).json('Token vacio');
        }
    
    } catch (error) {
        res.json({"respuesta" : "expiro"});
    }

    
    //res.json(req.data);
});


/// Validacion de token usuario
router.post('/validaTokenRiskAdministrador',(req,res)=>{
    const {token, id_risk} =req.body;
    const token_risk = `${token}`;
    const id_risk1 = `${id_risk}`;
    
    //console.log(token_risk);
    //console.log(id_risk1);
    //console.log(id_responde1);

    try {
        //console.log(token_risk);
        if (`${token}`!=='') {
            const content= jwt.verify(token_risk,'master_web');
            req.data=content;
            // console.log(req.data);
            if (id_risk1 == req.data.id_risk1) {
                res.json({"respuesta" : true});
            }else{
                res.json({"respuesta" : false});
            }
        }else{
            res.status(401).json('Token vacio');
        }
    
    } catch (error) {
        res.json({"respuesta" : "expiro"});
    }

    
    //res.json(req.data);
});


// listar respuestas de risk
router.post('/listRespuestaRisk',(req, res)=>{
    const{id_risk} = req.body;
    let sql = ` SELECT * 
    FROM risk 
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})


// actualizavcion del primer formilario
router.post('/unoRespuestasRisk',(req, res)=>{
    const{id_risk, group1, group2, group3, group4, group5, group6, group7} = req.body;
    let sql = `UPDATE risk SET
    group1 = '${group1}', group2 ='${group2}', group3 = '${group3}', group4='${group4}',
    group5 = '${group5}', group6 = '${group6}', group7 ='${group7}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})


// actualizavcion del segundo formilario
router.post('/dosRespuestasRisk',(req, res)=>{
    const{id_risk, group8, group9, group10, group11, group12} = req.body;
    let sql = `UPDATE risk SET
    group8 = '${group8}', group9 ='${group9}', group10 = '${group10}', group11='${group11}',
    group12 = '${group12}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del tercer formilario
router.post('/tresRespuestasRisk',(req, res)=>{
    const{id_risk, group13, group14, group15, group16} = req.body;
    let sql = `UPDATE risk SET
    group13 = '${group13}', group14 ='${group14}', group15 = '${group15}', group16='${group16}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del cuarto formilario
router.post('/cuatroRespuestasRisk',(req, res)=>{
    const{id_risk, group17, group18, group19, group20, group21} = req.body;
    let sql = `UPDATE risk SET
    group17 = '${group17}', group18 ='${group18}', group19 = '${group19}', group20='${group20}', group21='${group21}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del cinco formilario
router.post('/cincoRespuestasRisk',(req, res)=>{
    const{id_risk, group22, group23, group24, group25} = req.body;
    let sql = `UPDATE risk SET
    group22 = '${group22}', group23 ='${group23}', group24 = '${group24}', group25='${group25}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del seis formilario
router.post('/seisRespuestasRisk',(req, res)=>{
    const{id_risk, group26, group27} = req.body;
    let sql = `UPDATE risk SET
    group26 = '${group26}', group27 ='${group27}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del siete formilario
router.post('/sieteRespuestasRisk',(req, res)=>{
    const{id_risk, group28} = req.body;
    let sql = `UPDATE risk SET
    group28 = '${group28}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del siete formilario
router.post('/ochoRespuestasRisk',(req, res)=>{
    const{id_risk, group29} = req.body;
    let sql = `UPDATE risk SET
    group29 = '${group29}'
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// actualizavcion del estatus del Risk
router.post('/finalRisk',(req, res)=>{
    const{id_risk} = req.body;
    let sql = `UPDATE risk SET
    estatus = 1
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})


//Cambiar usuario para responder 
router.post('/cambiaUsuarioResponde',(req, res)=>{
    const{id_risk, id_responde} = req.body;
    let sql = `UPDATE risk SET
    id_responde = '${id_responde}', estatus = 0
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})


//Cambiar usuario para responder 
// actualizavcion del estatus del Risk
router.post('/mandarAEdicionRisk',(req, res)=>{
    const{id_risk, id_responde, id_usuario} = req.body;
    let sql = `UPDATE risk SET
    id_responde = '${id_responde}', estatus = 0
    WHERE id_risk = '${id_risk}'` ;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({msg: 'Carpeta eliminada', ok : true});
        }
    })
})

// Agregar historial 
router.post('/addHistorial',(req, res)=>{
    const{id_risk, id_pasa, id_responde, id_pregunta, codigo, fecha} = req.body;
    let sql = `INSERT INTO risk_historial( id_risk, id_pasa, id_responde, id_pregunta, codigo, fecha) 
    VALUES ('${id_risk}','${id_pasa}','${id_responde}','${id_pregunta}','${codigo}','${fecha}') ` ;

        conexion.query(sql,(err,rows,fields)=>{
            if (err) { 
                res.json({msg: err, ok : false});
            }
            else{
                res.json({msg: 'Carpeta eliminada', ok : true});
            }
        });
})


// Listar historial historial 
router.post('/listHistorialRisk',(req, res)=>{
    const{id_risk} = req.body;
    let sql = ` SELECT ris.*, 
    pasa.nombre AS nom_pasa, pasa.apellidos AS ape_pasa,
    respon.nombre AS nom_respon, respon.apellidos AS ape_respon,
    pregunta.pregunta, respuesta.respuesta
    FROM  risk_historial ris
    JOIN usuarios respon ON respon.id_usuario = ris.id_responde
    JOIN usuarios pasa ON pasa.id_usuario = ris.id_pasa
    JOIN risk_pregunta pregunta ON pregunta.id_pregunta = ris.id_pregunta
    JOIN risk_respuesta respuesta ON ((respuesta.id_pregunta = ris.id_pregunta) && (respuesta.codigo = ris.codigo))
    
    WHERE ris.id_risk= '${id_risk}' 
    ORDER BY ris.id_historial`;
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})



 




module.exports=router;
