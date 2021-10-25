import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class ProductService {
    constructor(@InjectModel("Product") private readonly productmodel : Model<Product>){}

    async insertProduct(title : string,desc : string,price : number,avatar : any){
        const NewProduct = new this.productmodel({
            title,
            desc,
            price,
            avatar
        });
        const result = await NewProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts(){ 
        const result = await this.productmodel.find({}).exec();
        console.table(result);
        return result.map(e => ({
            id : e.id,
            title : e.title,
            desc : e.desc,
            price: e.price,
            avatar : e.avatar
        }));
    }
   async getSingleProduct(id : string){ 
        const Sing = await this.productmodel.findById(id);
        if(!Sing){ 
            throw new NotFoundException("Could Not Find Product");
        } 
        const obj = { 
            id : Sing.id,
            title : Sing.title,
            desc : Sing.desc,
            price : Sing.price,
            avatar : Sing.avatar
        }
        return obj;
    }

    async UpdateProduct(id : string,title : string,desc : string,price : number,avatar : any){ 
        const update = await this.productmodel.findById(id);
        if(title){ 
            update.title = title;
        }
        if(desc){ 
            update.desc = desc;
        }
        if(price){ 
            update.price = price;
        }
        if(avatar){
            update.avatar = avatar.filename;
        }
        update.save();
    }
    async DeleteItem(id : string){
        await this.productmodel.deleteOne({id : id}).exec();
    }
}