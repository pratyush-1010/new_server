import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true,
        maxLength:256,
    },
    categoryDescription:{
        type:String,
        required:true,
        maxLength:1024,
    },
    categoryImage:{
        type:String,
        required:true,
    },
    categoryStatus:{
        type:String,
        required:true,
        maxLength:256,
    },
},
{timestamps:true})

const CategorySchema = mongoose.model("CategorySchema",categorySchema);
export default CategorySchema;