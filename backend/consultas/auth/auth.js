const router = require('express').Router()

const conexion = require('../../config/conexion');

const jwt =require('jsonwebtoken');





//Agregar usuario
router.post('/singin',(req,res)=>{
    const {usuario, password} =req.body;

    let sql =`SELECT * FROM usuarios WHERE usuario= '${usuario}' and password= '${password}' and estatus = 1 `;
    conexion.query(sql,(err,rows,fileds)=>{
        if (err) { 
     
            
        }
        else{
            
            if(rows.length >0){
                
                let data =JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'master_web');
               res.json({token});
            }else{
                res.json(rows);
            }
        }
    });
    
})


router.post('/test',verifyToken,(req,res)=>{
    
    res.json('Informacion secreta');
});


function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('no autorizado');

    const token = req.headers.authorization.substr(7);
    if (token!=='') {
        const content= jwt.verify(token,'master_web');
        req.data=content;
        next();
    }else{
        res.status(401).json('Token vacio');
    }
    
}
 



module.exports=router;