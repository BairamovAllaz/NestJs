import { triggerAsyncId } from 'async_hooks';
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    id : {type : String,required : true},
    title : {type : String,required : true},
    desc : {type : String,required : true},
    price :{type : Number,required : true},
    avatar : {type : String,required : true} 
})
export interface Product extends mongoose.Document {
    id : string;
    title : string;
    desc : string;
    price : number;
    avatar : any 
}