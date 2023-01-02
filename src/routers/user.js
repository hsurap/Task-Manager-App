const express=require('express')
const User=require('../models/user')
const router= new express.Router()
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeEmail,sendCancelationEmail}=require('../emails/account')


// we will setting individual middle for router

// router.get('/test',(req,res)=>{
//     res.send('hii')
// })

// const app=express()
// const port=process.env.PORT || 3000

// app.post('/users',(req,res)=>{
//     // console.log(req.body);
//     // res.send('testing')
//     const user=new User(req.body)
//     user.save().then(()=>{
//         res.send(user)
//     }).catch(()=>{
//         res.status(400)
//         res.send('error')
//     })
// })

// app.listen(port,()=>{
//     console.log('server is up on port ' + port);
// })


router.post('/users',async (req,res)=>{
    const user=new User(req.body)

    // handling individual error of await promise we can use try and catch
    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        const token=await user.generateAuthToken();
        res.status(201).send({user:user,token})
    }catch(e){
        res.status(400)
        res.send('error')
    }
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch(()=>{
    //     res.status(400)
    //     res.send('error')
    // })
})

// whenever res.send() is call it will call JSON.stringfy()
// by this toJSOn function also called
router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken();
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

// router.post('/users/login',async (req,res)=>{
//     try{
//         const user=await User.findByCredentials(req.body.email,req.body.password)
//         const token=await user.generateAuthToken();
//         res.send({user:user.getPublicProfile(),token})
//     }catch(e){
//         res.status(400).send()
//     }
// })

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.send(500).send()
    }
})

router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

 
router.get('/users/me',auth ,async(req,res)=>{
    res.send(req.user)
})


router.patch('/users/me',auth,async (req,res)=>{
    // const _id=req.params.id
    const allowedUpdates=['name','email','password','age']
    const updates=Object.keys(req.body)
    const isValidOperation=updates.every((item)=>{
        return allowedUpdates.includes(item)
    })

    if(!isValidOperation)
    {
        return res.status(400).send({error:'invalid updates'})
    }
    try{
        //const user=await User.findByIdAndUpdate(_id,{name:"rishab"})
        //const user=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        // find by id and updaye bypasses mongoose it persorm direct operation database
        // we will use traditional methord so that middleware work properlly
        // const user= await User.findById(_id)
        const user=req.user
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        // user will exist as auth occur
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    // const _id=req.params.id
    // const _id=req.user._id // this came from auth middle ware
    try{
        //const user= await User.findByIdAndDelete(_id)
        // now no need to check as auth already done
        // if(!user){
        //     res.status(404).send()
        // }
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.send(500).send()
    }
})

const upload=multer({
    //dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    //req.user.avatar=req.file.buffer
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})

module.exports=router

// router.get('/users',auth ,async(req,res)=>{
//     try{
//         const users=await User.find({})
//         res.send(users)
//     }catch(e){
//         res.status(500)
//         res.send()
//     }
//     // User.find({}).then((users)=>{
//     //     res.send(users)
//     // }).catch(()=>{
//     //     res.status(500)
//     //     res.send()
//     // })
// })

// router.get('/users/:id',async (req,res)=>{
//     // console.log(req.params);
//     const _id=req.params.id
//     try{
//         const user= await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch(()=>{
//     //     res.status(500).send()
//     // })
// })
