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


router.post('/test',(req,res)=>{
    const {token, id_risk, id_responde} =req.body;
    const token_risk = `${token}`;
    const id_risk1 = `${id_risk}`;
    const id_responde1 = `${id_responde}`;

    try {
        //console.log(token_risk);
        if (`${token}`!=='') {
            const content= jwt.verify(token_risk,'master_web');
            req.data=content;
            //console.log(req.data.id_risk1);
            if (id_risk1 == req.data.id_risk1 && id_responde1 == req.data.id_risk1) {
                res.json({"respuesta" : true});
            }else{
                res.json({"respuesta-no-corresponde-risk" : false});
            }
        }else{
            res.status(401).json('Token vacio');
        }
    
    } catch (error) {
        res.status(401).json('Expiro el token');
    }
 
    
    //res.json(req.data);
});


function verifyToken(req,res,next){

    try {
        if(!req.headers.authorization) return res.status(401).json('no autorizado');

        const token = req.headers.authorization.substr(7);
        console.log(token);
        if (token!=='') {
            const content= jwt.verify(token,'master_web');
            req.data=content;
            console.log(req.data);
            next();
        }else{
            res.status(401).json('Token vacio');
        }
    } catch (error) {
        
        res.status(401).json('Token vacio');
    }


    
}
 



module.exports=router;