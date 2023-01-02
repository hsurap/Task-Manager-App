const mongoose =require('mongoose')
// const validator=require('validator')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-mon-api',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false
// })

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true,

//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,

//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error ('Email is not valid')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:0,
//         // if you provode age then only it work
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true, 
//         trim:true,
//         minlength:7,
//         validate(value){
//             // if(value.length<=6){
//             //     throw new Error('Please enter larger length password')
//             // }
//             if(value.toLowerCase()=="password"){
//                 throw new Error('password cant be password');
//             }
//         }
//     }
// })


// const me=new User({
//     name:" ram  ",
//     email:'ram21@gmail.com      ',
//     password:"mypassword"
// })

// me.save().then((instance)=>{
//     console.log(instance);
// }).catch((error)=>{
//     console.log(error)
// })

// const task=mongoose.model('tasks',{
//     description:{
//         type:String,
//         trim:true,
//         required:true,
//     },
//     completed:{
//         type:Boolean,
//         default:false,
//     }
// })

// const study_nodejs= new task({
//     description:'Complete module',
// })

// study_nodejs.save().then((inst)=>{
//     console.log(inst);
// }).catch((error)=>{
//     console.log(error);
// })


