import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { v4 as uuidv4} from "uuid";
@Injectable()
export class ProductService {
    private products : Product[] = [];
    insertProduct(title : string,desc : string,price : number){
        const ProId = uuidv4();
        const NewProduct = new Product(ProId,title,desc,price);
        this.products.push(NewProduct);
        return ProId;
    }
    getProducts(){ 
        return [...this.products];
    }
    getSingleProduct(id : string){ 
        const Sing = this.products.find(p => p.id === id);
        if(!Sing){ 
            throw new NotFoundException("Could Not Find Product");
        } 
        return {...Sing};
    }
    UpdateProduct(id : string,title : string,desc : string,price : number){ 
        const Sing = this.products.find(p => p.id === id);
        const SingIndex = this.products.findIndex(p => p.id === id);
        const update  = {...Sing};
        if(title){ 
            update.title = title;
        }
        if(desc){ 
            update.desc = desc;
        }
        if(price){ 
            update.price = price;
        }
        this.products[SingIndex] = update;
    }
    DeleteItem(id : string){
        const SingIndex = this.products.findIndex(p => p.id === id);
        this.products.splice(SingIndex,1);
    }
}