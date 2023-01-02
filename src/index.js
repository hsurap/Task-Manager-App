const express=require('express')
require('./db/mongoose')
// const User=require('./models/user')
// const Task=require('./models/task')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')

const app=express()
const port=process.env.PORT
// const port=process.env.PORT || 3000

app.use(express.json())//automatically parse incoming json to object
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('server is up on port ' + port);
})


//file upload
// const  multer =require('multer')
// const upload=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000// 1 megabytes
//     },
//     fileFilter(req,file,callback){
//         // if(!file.originalname.endsWith('.pdf'))
//         // we will do this by regular expression
//         if(!file.originalname.match(/\.(doc|docx)$/))
//         {
//             return callback(new Error('File must be a word document'))
//         }
//         callback(undefined,true)

//     }

// })

// const errorMiddleware=(req,res,next)=>{
//     throw new Error('from my middleware')
// }
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })  



// const Task=require('./models/task')
// const User=require('./models/user')
// const main=async()=>{
//     // const task=await Task.findById('6365109b08154942d07dafc7')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);

//     const user= await User.findById('63650fa25b6794462c1c717f')
//     // console.log(user.tasks);
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);

// }
// main()

// without express middleware :  new request => run route handler
//with middleware : new request=>do something=> run route handler
// express middleware
// this should come before app.use() so that it can run before
// app.use((req,res,next)=>{
//     // console.log(req.method,req.path);
//     // next() //to run route handle

//     // get http methord not allows for get methord but for  post patch delete we will allow
//     if(req.method==='GET')
//     {
//         res.send('Get request are disable')
//     }else{
//         next()
//     }
// })
// when site is in maintenance mode
// app.use((req,res,next)=>{
//     res.status(503).send('Site is Currently down. check back soon')
// })


// const router= new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('this is from other router')
// })
// app.use(router)



// // json web token
// const  jwt=require('jsonwebtoken')
// const myFunction=async()=>{
//     const token=jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
//     console.log('\n');
//     console.log(token);
//     console.log('\n');
//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data);
// }
// myFunction()


// const bcrypt=require('bcryptjs')
// const myFunction =async ()=>{
//     const password="Red12345!"
//     const hashedPassword=await bcrypt.hash(password,8)
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch=await bcrypt.compare('Red12345!',hashedPassword)
//     console.log(isMatch);
// }
// myFunction()