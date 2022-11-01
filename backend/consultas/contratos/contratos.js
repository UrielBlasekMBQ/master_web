const router = require('express').Router()

const conexion = require('../../config/conexion');

const multer =require('multer');
const fs = require('fs');
const { request } = require('http');
const path = require('path');
const PDFDocument = require('pdfkit');



// Asignamos todas las rutas
//Get Equipos

//get equipos
router.get('/allContratos',(req, res)=>{
    let sql ='select * from contratos order by id_contrato'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//get Contratos de usuario
router.post('/getContratosUsuario',(req,res)=>{
    const{id_usuario} = req.body;

    let sql =  `SELECT * FROM contratos WHERE id_usuario = '${id_usuario}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json(rows)
        }
    });
    
})

//get etapas de usuario
router.post('/getEtapas',(req,res)=>{
    const{id_contrato} = req.body;

    let sql =  `SELECT etapa_con.*, con.nom_compania
                    FROM etapa_contrato etapa_con
                    JOIN contratos con ON con.id_contrato = etapa_con.id_contrato
                    WHERE etapa_con.id_contrato = '${id_contrato}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json(rows)
        }
    });
    
})

//get etapas de usuario
router.post('/getActividades',(req,res)=>{
    const{id_etapa_contrato} = req.body;

    let sql =  `SELECT * FROM actividad_contrato act_contrato
                JOIN contratos con ON con.id_contrato = act_contrato.id_contrato
                JOIN etapa_contrato eta_con ON eta_con.id_etapa_contrato = act_contrato.id_etapa_contrato
                WHERE act_contrato.id_etapa_contrato = '${id_etapa_contrato}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json(rows)
        }
    });
    
})



//Agregar Contrato
router.post('/addContrato',(req,res)=>{
    const{id_usuario,nom_compania,horas} = req.body;

    let sql =  `INSERT INTO contratos (id_usuario, nom_compania,num_horas_total,num_horas_restantes,num_etapas,num_actividades) 
    VALUES ('${id_usuario}', '${nom_compania}','${horas}', '${horas}', 0, 0)` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se agrego contrato', ok : true});
        }
    });
    
})

//Update de numero de etapas
router.post('/updateNumEtapas',(req,res)=>{
    const{id_contrato, numero} = req.body;

    let sql =  `UPDATE contratos SET num_etapas = '${numero}' WHERE id_contrato = '${id_contrato}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se actualizaron las etapas', ok : true});
        }
    });
    
})

//Agregar Etapas
router.post('/addEtapas',(req,res)=>{
    const{id_contrato,nom_etapa} = req.body;

    let sql =  `INSERT INTO etapa_contrato (id_contrato,nom_etapa, num_actividades, num_horas_etapa) 
    VALUES ('${id_contrato}','${nom_etapa}', 0, 0)` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se agrego etapa', ok : true});
        }
    });
    
})

// Creacion de documentos
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
      const ext = file.originalname.split(".").pop(); 
      const fileName = Date.now(); 
      cb(null, `${fileName}.${ext}`); 
    },
    destination: function (res, file, cb) {
      cb(null, `./uploads/contratos`);
    },
  });
  
  const upload = multer({ storage });
  
  router.post("/addActividad", upload.single("myFile"), (req, res) => {
    const file = req.file.filename;
    const { id_etapa_contrato,id_contrato,nom_actividad, num_horas_actividad}= req.body;
    

    let sql =  `INSERT INTO actividad_contrato (id_etapa_contrato,id_contrato,nom_actividad, num_horas_actividad, nom_doc) 
    VALUES ('${id_etapa_contrato}','${id_contrato}', '${nom_actividad}', '${num_horas_actividad}', '${file}')` ;


            conexion.query(sql,(err,rows,fields)=>{
                if (err) { throw err
                    
                }
                else{
                  res.json({msg: 'proceso agregago', ok : true});
                }
            });
  });


//get Documentos
  router.get('/:filename',async(req, res)=>{


    var file = path.join(__dirname , `../../uploads/contratos/${req.params.filename}`);
    res.download(file, function (err) {
        if (err) {

        } else {
 
        }
    });

})



//Update de Horas contrato
router.post('/updateHoras',(req,res)=>{
    const{id_contrato, horas} = req.body;

    let sql =  `UPDATE contratos SET num_horas_restantes = '${horas}' WHERE id_contrato = '${id_contrato}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se actualizo la hora', ok : true});
        }
    });
    
})

//Update de Horas etapas
router.post('/updateHorasEtapas',(req,res)=>{
    const{id_etapa_contrato , horas} = req.body;

    let sql =  `UPDATE etapa_contrato SET num_horas_etapa = '${horas}' WHERE id_etapa_contrato  = '${id_etapa_contrato }'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se actualizo la hora etapa', ok : true});
        }
    });
    
})

//Update actividades de etapas 
router.post('/updateActividadEtapa',(req,res)=>{
    const{id_etapa_contrato , num_actividades} = req.body;

    let sql =  `UPDATE etapa_contrato SET num_actividades = '${num_actividades}' WHERE id_etapa_contrato = '${id_etapa_contrato }'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se actualizo el numero de actividades en etapas', ok : true});
        }
    });
    
})

//Update de actividades de contrato
router.post('/updateActividadContrato',(req,res)=>{
    const{id_contrato, num_actividades} = req.body;

    let sql =  `UPDATE contratos SET num_actividades = '${num_actividades}' WHERE id_contrato = '${id_contrato}'` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json({msg: 'Se actualizo el numero de actividades en contrato', ok : true});
        }
    });
    
})


// get historial historial 
router.post('/getActividadesHistorial',(req,res)=>{
    const{id_contrato} = req.body;

    let sql =  `SELECT * 
                FROM actividad_contrato act_contrato
                JOIN contratos con ON con.id_contrato = act_contrato.id_contrato
                JOIN etapa_contrato eta_con ON eta_con.id_etapa_contrato = act_contrato.id_etapa_contrato
                WHERE act_contrato.id_contrato = '${id_contrato}'
                ORDER BY id_actividad_contrato ` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { 
            res.json({msg: err, ok : false});
        }
        else{
            res.json(rows)
        }
    });
    
})
 

//Agregar Proceo
router.post('/usuariombq',(req,res)=>{
    const{id_proceso} = req.body;

    let sql =  `SELECT *
               FROM usuarios usu
               JOIN logs_procesos logs ON logs.id_usuario = usu.id_usuario
                WHERE logs.id_proceso = 1` ;

    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
    
})




module.exports=router;