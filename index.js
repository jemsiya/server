//Server creation

//1.import express

const express = require('express')

//import dataservices

const dataservices =require('./sevices/data.service.js')

//import jwt
const jwt=require('jsonwebtoken');

//2. create an application using the express

const app = express()

//to parse json frpm request body

app.use(express.json())

//create a port number

app.listen(3000,()=>{
    console.log('listening on port 3000');
})
//Application specific middleware

const appMiddleware = (req,res,next)=>{
    console.log('Application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
    try{
    console.log('Router specific middleware')
    // const token=req.headers['x-access-token'];
    const token = req.body.token;///the token which is some letters that is nwnouuoejnbdfbfbeg
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
    }
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'please login first'
    })
}
}

 
//4.Resolving HTTP request
//get,post,put,patch,delete

//Resolving get request

// app.get('/',(req,res)=>{
//     res.send('Get request')
// })

// //Resolving post request

// app.post('/',(req,res)=>{
//     res.send('post request')
// })
// //Resolving put request
// app.put('/',(req,res)=>{
//     res.send('put request')
// })

// //Resolving patch request
// app.patch('/',(req,res)=>{
//     res.send('ptatch request')
// })
// //Resolving delete request

// app.delete('/',(req,res)=>{
//     res.send('delete request')
// })



//API request
//registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
   dataservices.register(req.body.acno,req.body.username,req.body.password)//data
   .then(result=>{
    res.status(result.statusCode).json(result)
   })//acess
   
//    if(result){
//     res.send('register successful')
//    }
//    else{
//     res.send('user already registered')
//    }
})

//login requst

app.post('/login',(req,res)=>{
    console.log(req.body);
   dataservices.login(req.body.acno,req.body.password)
   .then(result=>{
    res.status(result.statusCode).json(result);
   })
  
})
//deposit rquest
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.deposit(req.body.acno,req.body.password,req.body.amount)
   res.status(result.statusCode).json(result);
})


//withdraw request

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.withdraw(req.body.acno,req.body.password,req.body.amount)
   res.status(result.statusCode).json(result);
})

//transaction request

app.post('/getTransaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.getTransaction(req.body.acno,req.body.password,req.body.amount)
   res.status(result.statusCode).json(result);
})

//delete request
