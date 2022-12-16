//import jwt
const jwt=require('jsonwebtoken');

//import db

const db=require('./db')



//database
userDetails={
    1000:{acno:1000,username:'Amal',password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:'Athul',password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:'Akhil',password:1002,balance:1000,transaction:[]},
  }

  const register=(acno,username,password)=>{
    return db.User.findOne({acno})//data
    .then(user=>{
      if(user){
      return {
       status:false,
       statusCode:400,
       message:'user already registered'
      }
    }
    else{
      const newUser = new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save();  //datasaved in mongodb
      console.log(userDetails);
      return {
        status:true,
        statusCode:200,
        message:'register successful'

      }
    }})}

    const login=(acno,pswd)=>{
      
      
      return db.User.findOne({acno,password:pswd})//data
      .then(user=>{
        if (user){
          currentUser=user.username
          currentAcno=acno;
          const token =jwt.sign({currentAcno:acno},'superkey2022')
          return {
            status:'true',
            statusCode:200,
            message:'login successful',
            token:token
            }
        }
        else{
          return {
            status:'false',
            statusCode:400,
            message:'Invalid userdetails'
    
            }
        }
      })
      }
      //  if(pswd==userDetails[acno]['password']){
       
        //To generate token
          //it will generate a numbr and it assign to token 
       
      //  }
      //  else{
      //   return {
      //   status:'false',
      //   statusCode:400,
      //   message:'Password Incorrect'

      //   }
      //  }
      // }
      // else{
      //   return {
      //   status:'false',
      //   statusCode:400,
      //   message:'Invalid userdetails'

      //   }
      // }
      // }

      deposit=(acno,pswd,amt)=>{
        var amount=parseInt(amt)
        if(acno in userDetails){
          if(pswd==userDetails[acno]['password']){
           userDetails[acno]['balance']+=amount;
           userDetails[acno]['transaction'].push({
             Type:'Credit',
             Amount:amount
           })
           return{
            status:'true',
            statusCode:200,
            message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`

           }
          //   console.log(userDetails);
          //  return userDetails[acno]['balance']
          }
          else{
          //  alert('password mismach')
           return {
            status:'false',
            statusCode:400,
            message:'Password Incorrect'

           }
          }
        }
       else{
        //  alert('invalid data')
         return {
          status:'false',
          statusCode:400,
          message:'Invalid userdetails'

         }
       }
       }
       withdraw=(acno,pswd,amt)=>{
        var amount=parseInt(amt)
        if(acno in userDetails){
          if(pswd==userDetails[acno]['password']){
            if(userDetails[acno]['balance']>amount){
           userDetails[acno]['balance']-=amount;
           userDetails[acno]['transaction'].push({
            Type:'Debit',
            Amount:amount
          })
           return{
            status:'true',
            statusCode:200,
            message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
           }
          //  console.log(userDetails);
          //  return userDetails[acno]['balance']
            }
            else{
              // alert('transaction failed')
              return{
                status:'false',
               statusCode:400,
               message:'transaction failed'
              }
            }
          }
          else{
          //  alert('password mismach')
           return {
            status:'false',
            statusCode:400,
            message:'Password Incorrect'
           }
          }
        }
       else{
        //  alert('invalid data')
         return {
            status:'false',
            statusCode:400,
            message:'invalid data'
         }
       }}
       getTransaction=(acno)=>{
        return {
          status:'true',
            statusCode:200,
            Transaction:userDetails[acno]['transaction']
        }
        }
       
     

    module.exports={
        register,
        login,
        deposit,
       withdraw,
       getTransaction
    }