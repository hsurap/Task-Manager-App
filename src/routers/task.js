const express=require('express')
const Task=require('../models/task')
const auth=require('../middleware/auth')
const router= new express.Router()

router.post('/tasks',auth,async (req,res)=>{
    //const task=new Task(req.body)

    const task=new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
        await task.save()
        res.status(201)
        res.send(task)
    }catch(e){
        res.status(400)
        res.send('error')
    }
})


// GET/tasks=>return complete and incomplete tasks
//Get/tasks?completed=true =>return completed tasks
//Get/tasks?completed=false =>return not completed task
// setting up pagination
//option=>limit skip
// GEt/tasks?limit=10&skip=0 =>give first 10 result without skiping any result
// GEt/tasks?limit=10&skip=10 => give 10th to 20th result
//GET/tasks?sortBy=createdAt:asc
//GET/tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){
        //match.completed=req.query.completed // req.query/completed is string not boolean
        match.completed=req.query.completed==="true"
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }
    try{
        //const task=await Task.find({owner:req.user._id})
        //or
        await req.user.populate({
            path:'tasks',
            match:match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                // sort:{
                //     //1=asc -1=desc
                //     completed:1
                // }
                sort:sort,

            }
        }).execPopulate()
        res.send(req.user.tasks)
        res.send(task)
    }catch(e){
        res.status(500)
        res.send()
    }
    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500)
    //     res.send()
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        //const task=await Task.findById(_id)
        // console.log(task);
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500)
        res.send()
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    //const _id=req.params.id
    const allowedUpdates=['description','completed']
    const updates=Object.keys(req.body)
    const isValidOperation=updates.every((item)=>{
        return allowedUpdates.includes(item)
    })
    if(!isValidOperation)
    {
        return res.status(400).send({error:'invalid updates'})
    }
    try{
        //const task=await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        // updating because middleware work properlly
        // const task=await Task.findById(_id)
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        //const task= await Task.findByIdAndDelete(_id)
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.send(500).send()
    }
})

module.exports=router



// router.post('/tasks',async (req,res)=>{
//     const task=new Task(req.body)
//     try{
//         await task.save()
//         res.status(201)
//         res.send(task)
//     }catch(e){
//         res.status(400)
//         res.send('error')
//     }
//     // task.save().then(()=>{
//     //     res.status(201)
//     //     res.send(task)
//     // }).catch(()=>{
//     //     res.status(400)
//     //     res.send('error')
//     // })
// })

// router.get('/tasks/:id',async(req,res)=>{
//     const _id=req.params.id
//     try{
//         const task=await Task.findById(_id)
//         // console.log(task);
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500)
//         res.send()
//     }
//     // Task.findById(_id).then((task)=>{
//     //     if(!task){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(task)
//     // }).catch((e)=>{
//     //     res.status(500)
//     //     res.send()
//     // })
// })