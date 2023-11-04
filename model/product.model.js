import mongoose from "mongoose";
import CategorySchema from "./category.model";

const { Schema } = mongoose;

const productSchema = new Schema({
    proName:{
        type:String,
        required:true,
        maxlength:256,
    },
    proSku:{
        type:String,
        maxlength:256,
        
    },
    proDesc:{
        type:String,
        maxlength:256,
    },
    stock:{
       type:Number,
       required:true,
    },
    proPrice:{
        type:Number,
        maxlength:15,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:CategorySchema,
        required:true
    },
    proStatus:{
        type:String,
        required:true,
    }, 
    proImage:{
       type:Array, 
       required:true
    }
},
{timestamps:true})

const Products = mongoose.model('Products',productSchema);
export default Products;