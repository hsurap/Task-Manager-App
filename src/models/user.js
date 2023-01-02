const mongoose =require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
       
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error ('Email is not valid')
            } 
        }
    },
    age:{
        type:Number,
        default:0,
         // if you provode age then only it work
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true, 
        trim:true,
        minlength:7,
        validate(value){
            // if(value.length<=6){
            //     throw new Error('Please enter larger length password')
            // }
            if(value.toLowerCase()=="password"){
                throw new Error('password cant be password');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

// virtual property
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

// static methords are accessible to model
userSchema.statics.findByCredentials=async (email,password)=>{
    const user =await User.findOne({email:email})
    if(!user){
        throw new Error('Unable to login in')
    }

    const isMatched =await bcrypt.compare(password,user.password)
    if(!isMatched)
    {
        throw new Error('unable to login')
    }
    return user
}

// methord methords are accessible to instances
userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user.id.toString()},process.env.JWT_SECRET)
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    return token
}

// this function work same as getPublicProfile function
// without changing anything in router
// whenever res.send() is call it will call JSON.stringfy()
// by this toJSOn function also called
userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// userSchema.methods.getPublicProfile=function(){
//     const user=this;
//     const userObject=user.toObject();
//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }

// middleware
// to do something before or after after some particular thing
//hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user=this
    // console.log('just befor saving');
    // this will be true if new user created or password is update
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()// next should be there , all code before next will run before save
})


//delete user task when user is remove
userSchema.pre('remove',async function(next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema)


module.exports=User