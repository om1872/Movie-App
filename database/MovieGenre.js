const mongoose = require('mongoose');

const MovieGenreSchema = new mongoose.Schema({
    id:{
        type:mongoose.SchemaTypes.String,
        required:[true, 'Genre Id is required'],
        unique:true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: [true, 'Genre Name is required']
    }
});

module.exports=mongoose.model('movieGenre',MovieGenreSchema);