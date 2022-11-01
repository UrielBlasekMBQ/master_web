const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'master_web'
});

conexion.connect((err)=>{
    if(err){
        console.log('he ocurrido un error' + err);
    }
    else{
        console.log('La base de datos se conecto !!');
    }

});

module.exports = conexion; 