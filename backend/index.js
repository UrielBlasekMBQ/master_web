require('./config/conexion');

const express = require('express');
const cors =require('cors');
const multer =require('multer');
var bodyParser = require('body-parser')

const port =(process.env.port || 3000);

//Express
const app =express();
app.use(cors());

app.use(bodyParser.json());  //new line of code
app.use(bodyParser.urlencoded({ extended: false }));  //new line of code

//admitir
app.use(express.json())

//Config
app.set('port',port);
 
//Usuarios
app.use('/api', require('./consultas/usuarios/rutas'))
//Catalogo de tipos de usuario
app.use('/catUsuarios', require('./consultas/usuarios/catalogo_t_usuario'))
//Permisos
app.use('/permisos', require('./consultas/usuarios/permisoso'))


//Procesos
app.use('/proceso', require('./consultas/procesos/procesos'))



//Dodumentos asignados
app.use('/docAsigna', require('./consultas/doc_asignados/documentos_asigna'))
//Dodumentos revisados
app.use('/docRevisa', require('./consultas/doc_asignados/documentos_revisa'))
//Dodumentos revisados
app.use('/docAprueba', require('./consultas/doc_asignados/documentos_aprueba'))
// Catalogo de vigencias 
app.use('/catVigencias', require('./consultas/doc_asignados/catalogo_vigencias'))



//  Marco legal
app.use('/marco_legal', require('./consultas/marco_legal/marco_legal'))
//Marco legal Vista pdf padre
app.use('/marco_legal_vistaPadre', require('./consultas/marco_legal/marco_legal_vistaPadre'))
//Marco legal descarga pdf padre
app.use('/marco_legal_descarga', require('./consultas/marco_legal/marco_legal_descargaPadre'))
//Marco legal descarga pdf hijo
app.use('/marco_legal_descarga_hijo', require('./consultas/marco_legal/marco_legal_descarga_hijo'))
//Marco legal hijos
app.use('/marco_legal_hijos', require('./consultas/marco_legal/marco_legal_hijos'))



//Manual Calidad
app.use('/manual_calidad', require('./consultas/manual_calidad'))


//Registros
app.use('/registros', require('./consultas/registros/registros'))
app.use('/registro_legal_descarga_hijo', require('./consultas/registros/registros_descarga_hijos'))
app.use('/registros_hijos', require('./consultas/registros/registros_hijos'))



//  Manual de Operaciones 
app.use('/operacion_legal', require('./consultas/manual_operaciones/operacion_legal'))
//operacion  Vista pdf padre
app.use('/operacion_legal_vistaPadre', require('./consultas/manual_operaciones/operacion_legal_vistaPadre'))
//operacion  descarga pdf padre
app.use('/operacion_legal_descarga', require('./consultas/manual_operaciones/operacion_legal_descargaPadre'))
//operacion  descarga pdf hijo
app.use('/operacion_legal_descarga_hijo', require('./consultas/manual_operaciones/operacion_legal_descarga_hijo'))
//operacion hijos
app.use('/operacion_legal_hijos', require('./consultas/manual_operaciones/operacion_legal_hijos'))



//  Normas ISO
app.use('/norma_iso', require('./consultas/normas/norma_iso'))
//Norma legal Vista pdf padre
app.use('/norma_is_vistaPadre', require('./consultas/normas/normas_iso_vistaPadre'))
//Norma legal descarga pdf padre
app.use('/norma_iso_descarga', require('./consultas/normas/norma_iso_descargaPadre'))
//Norma legal descarga pdf hijo
app.use('/norma_iso_descarga_hijo', require('./consultas/normas/norma_iso_descarga_hijo'))
//Norma legal hijos
app.use('/norma_iso_hijos', require('./consultas/normas/norma_iso_hijos'))



//  Manual Calidad
app.use('/calidad_legal', require('./consultas/manual_calidad/calidad_legal'))
//Marco legal Vista pdf padre
app.use('/calidad_legal_vistaPadre', require('./consultas/manual_calidad/calidad_legal_vistaPadre'))
//Marco legal descarga pdf padre
app.use('/calidad_legal_descarga', require('./consultas/manual_calidad/calidad_legal_descargaPadre'))
//Marco legal descarga pdf hijo
app.use('/calidad_legal_descarga_hijo', require('./consultas/manual_calidad/calidad_legal_descarga_hijo'))
//Marco legal hijos
app.use('/calidad_legal_hijos', require('./consultas/manual_calidad/calidad_legal_hijos'))


//  capacitacion
app.use('/capacitacion_legal', require('./consultas/capacitacion/capacitacion_legal'))
//capacitacion legal Vista pdf padre
app.use('/capacitacion_vistaPadre', require('./consultas/capacitacion/capacitacion_legal_vistaPadre'))
//capacitacion legal descarga pdf padre
app.use('/capacitacion_legal_descarga', require('./consultas/capacitacion/capacitacion_legal_descargaPadre'))
//capacitacion legal descarga pdf hijo
app.use('/capacitacion_legal_descarga_hijo', require('./consultas/capacitacion/capacitacion_legal_descarga_hijo'))
//capacitacion legal hijos
app.use('/capacitacion_legal_hijos', require('./consultas/capacitacion/capacitacion_legal_hijos'))

//ACOMPAÑAMIENTO
app.use('/acompanamiento', require('./consultas/acompanamiento/solicitud-acompa'))

//EFECTO
app.use('/efecto', require('./consultas/efecto/efecto'))

//AMEF
app.use('/amef-grupo', require('./consultas/amef/amef-grupo'))
app.use('/amef', require('./consultas/amef/amef'))

//HISTORIAL
app.use('/historial', require('./consultas/historial/historial'))

//DASHBOARD
app.use('/dashboard', require('./consultas/dashboard/dashboard'))

//DASHBOARD
app.use('/multi_proceso', require('./consultas/multi_proceso/multi_proceso'))

//Auth
app.use('/auth', require('./consultas/auth/auth'))

// Email 
app.use('/email', require('./mailer/acompanamiento/emailer'))

// Contratos 
app.use('/contratos', require('./consultas/contratos/contratos'))

// Contrato permisos
app.use('/contratos_permiso', require('./consultas/contratos_permiso/contrato_permiso'))





//inicias express
app.listen(app.get('port'), (error)=>{
    if (error) {
        console.log('error al iniciar el servidor'+ error);
    }
    else{
        console.log('Servidor iniciado en el puerto: '+ port);
    }
})
//npm run dev  