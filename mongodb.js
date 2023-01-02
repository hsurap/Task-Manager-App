// //CRUD operation create read update delete

// //const mongodb=require('mongodb');
// //const MongoClient=mongodb.MongoClient
// //const ObjectID=mongodb.ObjectID
// const {MongoClient,ObjectID}=require('mongodb');
 
// const connectionURL='mongodb://127.0.0.1:27017';
// const databaseName='task-manager';

// //const id=mongodb.ObjectID
// // const id= new ObjectID()
// // console.log(id);
// //console.log(id.getTimestamp());
// // guid=JSON.stringify(id)
// // id1=JSON.parse(guid);
// // console.log(guid);  

// MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
//     if(error){
//         return console.log('Unable to connect to database');
//     }
//     //console.log('connected correctly');
//     const db=client.db(databaseName) 

//     //--------------------------------------------------------------
//     //delete


//     // db.collection('users').deleteMany({
//     //     name:'parush'
//     // }).then((result)=>{
//     //     console.log(result);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // })

//     // db.collection('tasks').deleteOne({
//     //     description:'talk'
//     // }).then((result)=>{
//     //     console.log(result);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // })



//     //--------------------------------------------------------------
//     //-------------------------------------------------------------
//     //update
//     //using promises not call back

//     // const updatePromise=db.collection('users').updateOne({
//     //     // _id:ObjectID("62e7bb9e48c3445ddf2d4594")
//     //     name:"Parushh"
//     // },{
//     //     $set:{
//     //         name:'mike'
//     //     }
//     // })

//     // updatePromise.then((result)=>{
//     //     console.log(result);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // })
    
//     // db.collection('user').updateOne({
//     //     _id:ObjectID("62e5290a0723b38dd339f812")
//     // },{
//     //     // $set:{
//     //     //     name:'mike'
//     //     // }
//     //     $inc:{
//     //         age:5
//     //     }
//     // }).then((result)=>{
//     //     console.log(result);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // })

//     // db.collection('tasks').updateMany({
//     //     completed:false
//     // },{
//     //     $set:{
//     //         completed:true
//     //     }
//     // }).then((result)=>{
//     //     console.log(result);
//     // }).catch((error)=>{
//     //     console.log(error);
//     // })


//     //-------------------------------------------------------------
//     //---------------------------------------------------------------
//     //read

//     // db.collection('users').findOne({name:'jeny'},(error,req_user)=>{
//     //     if(error){
//     //         return console.log('unable to fetch the user');
//     //     }
//     //     console.log(req_user);
//     // })

//     // db.collection('users').findOne({name:'jeny',age:1},(error,req_user)=>{
//     //     if(error){
//     //         return console.log('unable to fetch the user');
//     //     }
//     //     console.log(req_user);
//     // })
//     // it will return first matching document
//     // db.collection('user').findOne({_id:ObjectID("62e52b8747ae9aca3fb32c2c")},(error,req_user)=>{
//     //     if(error){
//     //         return console.log('unable to fetch the user');
//     //     }
//     //     console.log(req_user);
//     // })

//     // db.collection('user').find({age:25}).toArray((error,users)=>{
//     //     console.log(users);
//     // })

//     // db.collection('user').find({age:25}).count((error,count)=>{
//     //     console.log(count);
//     // })
    

//     // db.collection('tasks').findOne({_id:ObjectID("62e52b43fe9181321ed87fde")},(error,t)=>{
//     //     if(error){
//     //         return console.log('error');
//     //     }else{
//     //         console.log(t);
//     //     }
//     // })

//     // db.collection('tasks').find({completed:false}).toArray((error,ind_task)=>{
//     //     if(error)
//     //     {
//     //         return console.log(error);
//     //     }
//     //     console.log(ind_task);
//     // })

//     //-------------------------------------------------------------

//     //------------------------------------------------------------
//     //insertion

//     // db.collection('users').insertOne({
//     //  //   _id:id,
//     //     name:"Aarushh",
//     //     age:20,
//     // },(error,result)=>{
//     //     if(error){
//     //         return console.log('unable to insert user');
//     //     }
//     //     console.log(result.ops);
//     // })

//     // db.collection('users').insertMany([
//     //     {
//     //         name:"jeny", 
//     //         age:25,
//     //     },{
//     //         name:"tanisha",
//     //         age:12,
//     //     }
//     // ],(error,result)=>{
//     //     if(error){
//     //         return console.log(error);
//     //     }
//     //     console.log(result.ops);
//     // })

//     // db.collection('tasks').insertMany([
//     //     {
//     //         description:'study',
//     //         completed:false,
//     //     },{
//     //         description:'play',
//     //         completed:true,
//     //     },
//     //     {
//     //         description:'talk',
//     //         completed:true,
//     //     }
//     // ],(error,result)=>{
//     //     if(error){
//     //         return console.log(error);
//     //     }
//     //     console.log(result.ops);
//     // })

//     //------------------------------------------------------------------

// });
 