const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex')

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image')

const PORT=process.env.PORT||4000;

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'sushantlenka',
      password : '',
      database : 'smart-brain'
    }
  })

  

const app=express();
app.use(bodyParser.json());
app.use(cors());


const database={
    users:[
        {
            id:"123",
            name:'John',
            email:'john@cena.com',
            password:'1234567',
            entries:0,
            joined: new Date()

        },
        {
            id:"124",
            name:'Randy',
            email:'randy@orton.com',
            password:'1234567',
            entries:0,
            joined: new Date()

        }
    ],
    login:[
        {
            id:'955',
            hash:'',
            email:'john@cena.com'
        }
    ]
}

app.get('/',(req,res)=>{
    res.json('it is working');
})

app.get('/profile/:id',(req,res)=>{
    profile.handleProfileGet(req,res,db)
})

app.post('/signin',(req,res)=>{
    signin.handleSignin(req,res,db,bcrypt)
})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})


app.put('/image',(req,res)=>{
    image.handleImage(req,res,db)
})

app.post('/imageurl',(req,res)=>{
    image.handleApiCall(req,res)
})

app.listen(PORT,(req,res)=>{
    console.log(`Server started at port ${PORT}`);
});