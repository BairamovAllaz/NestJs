import { Controller,Get,Post,Body,Param,Patch,Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path, { extname } from "path/posix";
import { ProductService } from "./products.service";
import { v4 as uuidv4} from "uuid";
@Controller('products')
export class ProductsController {
    constructor(private productService : ProductService){};
    @Post()
    @UseInterceptors(FileInterceptor('file',{
        storage : diskStorage({
            destination : './ImagesMulter',
            filename : (req,file,cb) => {
                const randomName : any = uuidv4();
                return cb(null,`${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    addProduct(
        @Body('title') title : string,
        @Body('desc') desc : string,
        @Body('price') price : number,
        @UploadedFile() avatar : Express.Multer.File
    ) : any {
        const GeneratedId=this.productService.insertProduct(title,desc,price,avatar.filename);
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
    @UseInterceptors(FileInterceptor('file',{
        storage : diskStorage({
            destination : './ImagesMulter',
            filename : (req,file,cb) => {
                const randomName : any = uuidv4();
                return cb(null,`${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    update(
        @Param('id') id : string,
        @Body('title') title : string,
        @Body('desc') desc : string,
        @Body('price') price : number,
        @UploadedFile() avatar : Express.Multer.File
        ){ 
            this.productService.UpdateProduct(id,title,desc,price,avatar);
            return "Its working you updated an prdouct";
        }
    @Delete(':id')
    deleteItem(@Param("id") id : string){ 
        this.productService.DeleteItem(id);
        return null;
    }



}