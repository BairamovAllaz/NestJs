import { Controller,Get,Post,Body,Param,Patch } from "@nestjs/common";
import { ProductService } from "./products.service";
@Controller('products')
export class ProductsController {
    constructor(private productService : ProductService){};
    @Post()
    addProduct(
        @Body('title') title : string,
        @Body('desc') desc : string,
        @Body('price') price : number,
    ) : any {
        const GeneratedId=this.productService.insertProduct(title,desc,price);
        return {id : GeneratedId};
    }

    @Get()
    getAllData() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getSingle(@Param('id') Prodid : string){ 
        return this.productService.getSingleProduct(Prodid)
    }

    @Patch(':id')
    update(
        @Param('id') id : string,
        @Body('title') title : string,
        @Body('desc') desc : string,
        @Body('price') price : number,
        ){ 
            this.productService.UpdateProduct(id,title,desc,price);
            return null;
        }
}