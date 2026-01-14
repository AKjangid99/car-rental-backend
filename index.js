const express = require("express")
const bcrypt = require("bcryptjs")

const app = express();
const port = 30000;

let data = []

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  const { username , password } = req.body 
  if ( username && password ){
      let id = data.length
      const createdat = new Date() 
      const sltedPass = await bcrypt.hash( password , 10)
      const json = { 
        id,
        username,
        sltedPass,
        createdat
      }
      data.push( json )
      console.log( data )
      res.status(200).send("successful")
  }else{
        res.status(403).send("username or password is missing")
  }
})

app.post('/signin', async(req , res)=>{
    const { username , password } = req.body
    if(  username && password ){
        let 
    }else{
        res.status(403).send("username or password is missing")
    }
})

app.listen(port)