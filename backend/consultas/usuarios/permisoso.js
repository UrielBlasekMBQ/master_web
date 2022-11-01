const router = require('express').Router()

const conexion = require('../../config/conexion');



// Asignamos todas las rutas

// get un usuario
//--------------------------

router.post('/get_permisos',(req,res)=>{
    const {id_usuario} = req.body
    let sql = `SELECT * FROM permisos WHERE id_usuario = '${id_usuario}' `;
    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json(rows);
        }
    });
})

//Agregar usuario
router.post('/:id',(req,res)=>{
    
    const {id} = req.params;
    const{        
        calidad,
        calidadVer,
        calidadDescargar,
        calidadAdd,
        calidadUpdate,
        calidadDelete,
        operacion,
        operacionVer,
        operacionDescargar,
        operacionAdd,
        operacionUpdate,
        operacionDelete,
        registros,
        registrosVer,
        registrosDescargar,
        registrosAdd,
        registrosUpdate,
        registrosDelete,
        marcoLegal,
        norma,
        normaVer,
        normaDescargar,
        normaAdd,
        normaUpdate,
        normaDelete,
        marco,
        marcoVer,
        marcoDescargar,
        marcoAdd,
        marcoUpdate,
        marcoDelete,
        diagramas,
        foda,
        toruga,
        amef,
        amef_amef,
        efecto_fallo,
        acompanamiento,
        solicitaAcom,
        revisaAcom,
        controlDocumento,
        asigna,
        asignaVer,
        asignaAdd,
        revisa,
        revisaVer,
        revisaRevisar,
        aprueba,
        apruebaVer,
        apruebaAprueba,
        proceso,
        procesoAdd,
        procesoUpdate,
        procesoDelete,
        usuarios,
        usuario,
        usuarioAdd,
        usuarioUpdate,
        usuarioDelete,
        permiso,
        permisoAdd,
        historial,
        configuracion,        
        capacitacion,
        capacitacionVer,
        capacitacionHistorial,
        capacitacionAdd,
        capacitacionUpdate,
        capacitacionDelete
    } = req.body;


    let sql =  `INSERT INTO permisos (id_usuario,

calidad,
calidadVer,
calidadDescargar,
calidadAdd,
calidadUpdate,
calidadDelete,
operacion,
operacionVer,
operacionDescargar,
operacionAdd,
operacionUpdate,
operacionDelete,
registros,
registrosVer,
registrosDescargar,
registrosAdd,
registrosUpdate,
registrosDelete,
marcoLegal,
norma,
normaVer,
normaDescargar,
normaAdd,
normaUpdate,
normaDelete,
marco,
marcoVer,
marcoDescargar,
marcoAdd,
marcoUpdate,
marcoDelete,
diagramas,
foda,
toruga,
amef,
amef_amef,
efecto_fallo,
acompanamiento,
solicitaAcom,
revisaAcom,
controlDocumento,
asigna,
asignaVer,
asignaAdd,
revisa,
revisaVer,
revisaRevisar,
aprueba,
apruebaVer,
apruebaAprueba,
proceso,
procesoAdd,
procesoUpdate,
procesoDelete,
usuarios,
usuario,
usuarioAdd,
usuarioUpdate,
usuarioDelete,
permiso,
permisoAdd,
historial,
configuracion,
capacitacion,
capacitacionVer,
capacitacionHistorial,
capacitacionAdd,
capacitacionUpdate,
capacitacionDelete
          ) 
          VALUES ( '${id}',
          '${calidad}',
          '${calidadVer}',
          '${calidadDescargar}',
          '${calidadAdd}',
          '${calidadUpdate}',
          '${calidadDelete}',
          '${operacion}',
          '${operacionVer}',
          '${operacionDescargar}',
          '${operacionAdd}',
          '${operacionUpdate}',
          '${operacionDelete}',
          '${registros}',
          '${registrosVer}',
          '${registrosDescargar}',
          '${registrosAdd}',
          '${registrosUpdate}',
          '${registrosDelete}',
          '${marcoLegal}',
          '${norma}',
          '${normaVer}',
          '${normaDescargar}',
          '${normaAdd}',
          '${normaUpdate}',
          '${normaDelete}',
          '${marco}',
          '${marcoVer}',
          '${marcoDescargar}',
          '${marcoAdd}',
          '${marcoUpdate}',
          '${marcoDelete}',
          '${diagramas}',
          '${foda}',
          '${toruga}',
          '${amef}',
          '${amef_amef}',
          '${efecto_fallo}',
          '${acompanamiento}',
          '${solicitaAcom}',
          '${revisaAcom}',
          '${controlDocumento}',
          '${asigna}',
          '${asignaVer}',
          '${asignaAdd}',
          '${revisa}',
          '${revisaVer}',
          '${revisaRevisar}',
          '${aprueba}',
          '${apruebaVer}',
          '${apruebaAprueba}',
          '${proceso}',
          '${procesoAdd}',
          '${procesoUpdate}',
          '${procesoDelete}',
          '${usuarios}',
          '${usuario}',
          '${usuarioAdd}',
          '${usuarioUpdate}',
          '${usuarioDelete}',
          '${permiso}',
          '${permisoAdd}',
          '${historial}',
          '${configuracion}',
          '${capacitacion}',
          '${capacitacionVer}',
          '${capacitacionHistorial}',
          '${capacitacionAdd}',
          '${capacitacionUpdate}',
          '${capacitacionDelete}'
          );`;





    conexion.query(sql,(err,rows,fields)=>{
        if (err) { throw err
            
        }
        else{
            res.json({status: 'Se agregaron permisos'});
        }
    });
    
})
 

//Modimficar
router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const{
        calidad,
        calidadVer,
        calidadDescargar,
        calidadAdd,
        calidadUpdate,
        calidadDelete,
        operacion,
        operacionVer,
        operacionDescargar,
        operacionAdd,
        operacionUpdate,
        operacionDelete,
        registros,
        registrosVer,
        registrosDescargar,
        registrosAdd,
        registrosUpdate,
        registrosDelete,
        marcoLegal,
        norma,
        normaVer,
        normaDescargar,
        normaAdd,
        normaUpdate,
        normaDelete,
        marco,
        marcoVer,
        marcoDescargar,
        marcoAdd,
        marcoUpdate,
        marcoDelete,
        diagramas,
        foda,
        toruga,
        amef,
        amef_amef,
        efecto_fallo,
        acompanamiento,
        solicitaAcom,
        revisaAcom,
        controlDocumento,
        asigna,
        asignaVer,
        asignaAdd,
        revisa,
        revisaVer,
        revisaRevisar,
        aprueba,
        apruebaVer,
        apruebaAprueba,
        proceso,
        procesoAdd,
        procesoUpdate,
        procesoDelete,
        usuarios,
        usuario,
        usuarioAdd,
        usuarioUpdate,
        usuarioDelete,
        permiso,
        permisoAdd,
        historial,
        configuracion,
        capacitacion,
        capacitacionVer,
        capacitacionHistorial,
        capacitacionAdd,
        capacitacionUpdate,
        capacitacionDelete
        } = req.body; 

    let sql =`UPDATE permisos SET  
        calidad = '${calidad}',
        calidadVer = '${calidadVer}',
        calidadDescargar = '${calidadDescargar}',
        calidadAdd = '${calidadAdd}',
        calidadUpdate = '${calidadUpdate}',
        calidadDelete = '${calidadDelete}',
        operacion = '${operacion}',
        operacionVer = '${operacionVer}',
        operacionDescargar = '${operacionDescargar}',
        operacionAdd = '${operacionAdd}',
        operacionUpdate = '${operacionUpdate}',
        operacionDelete = '${operacionDelete}',
        registros = '${registros}',
        registrosVer = '${registrosVer}',
        registrosDescargar = '${registrosDescargar}',
        registrosAdd = '${registrosAdd}',
        registrosUpdate = '${registrosUpdate}',
        registrosDelete = '${registrosDelete}',
        marcoLegal = '${marcoLegal}',
        norma = '${norma}',
        normaVer = '${normaVer}',
        normaDescargar = '${normaDescargar}',
        normaAdd = '${normaAdd}',
        normaUpdate = '${normaUpdate}',
        normaDelete = '${normaDelete}',
        marco = '${marco}',
        marcoVer = '${marcoVer}',
        marcoDescargar = '${marcoDescargar}',
        marcoAdd = '${marcoAdd}',
        marcoUpdate = '${marcoUpdate}',
        marcoDelete = '${marcoDelete}',
        diagramas = '${diagramas}',
        foda = '${foda}',
        toruga = '${toruga}',
        amef = '${amef}',
        amef_amef = '${amef_amef}',
        efecto_fallo = '${efecto_fallo}',
        acompanamiento = '${acompanamiento}',
        solicitaAcom = '${solicitaAcom}',
        revisaAcom = '${revisaAcom}',
        controlDocumento = '${controlDocumento}',
        asigna = '${asigna}',
        asignaVer = '${asignaVer}',
        asignaAdd = '${asignaAdd}',
        revisa = '${revisa}',
        revisaVer = '${revisaVer}',
        revisaRevisar = '${revisaRevisar}',
        aprueba = '${aprueba}',
        apruebaVer = '${apruebaVer}',
        apruebaAprueba = '${apruebaAprueba}',
        proceso = '${proceso}',
        procesoAdd = '${procesoAdd}',
        procesoUpdate = '${procesoUpdate}',
        procesoDelete = '${procesoDelete}',
        usuarios = '${usuarios}',
        usuario = '${usuario}',
        usuarioAdd = '${usuarioAdd}',
        usuarioUpdate = '${usuarioUpdate}',
        usuarioDelete = '${usuarioDelete}',
        permiso = '${permiso}',
        permisoAdd = '${permisoAdd}',
        historial = '${historial}',
        configuracion = '${configuracion}',
        capacitacion = '${capacitacion}',
        capacitacionVer = '${capacitacionVer}',
        capacitacionHistorial = '${capacitacionHistorial}',
        capacitacionAdd = '${capacitacionAdd}',
        capacitacionUpdate = '${capacitacionUpdate}',
        capacitacionDelete = '${capacitacionDelete}'
        
    WHERE id_usuario = ${id}`

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
        if (err) { throw err
            
        }
        else{
            res.json({status: 'usuario editado'});
        }
    });
    
});




module.exports=router;