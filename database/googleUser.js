const mongoose=require('mongoose');

const GoogleUserSchema=new mongoose.Schema({
    googleId:{
        type:mongoose.SchemaTypes.String,
        required:true
    }
    ,createdAt:{
        type:mongoose.SchemaTypes.Date,
        required:true,
        default:new Date()
    }
});

module.exports=mongoose.model('google-users',GoogleUserSchema);