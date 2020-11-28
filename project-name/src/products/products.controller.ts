import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Put,
    Body,
    Header,
    Redirect,
    HttpCode,
    HttpStatus,
    Req,
    Res
} from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from './dto/update-product.dto';
import {Request, Response} from 'express';
import {ProductsService} from "./products.service";
import {Product} from "./schemas/product.schema";

//Express
// app.use((req, res, next) => {
//     res.status(201).end('poka')
// })

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {

    }

    // @Get()
    // // @Redirect('https://google.com', 301)
    // getAll(@Req() req: Request, @Res() res: Response) {
    //     res.status(201).end('Poka')
    //     return 'getAll'
    // }

    @Get(':id')
    getAll(): Promise<Product[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
        return this.productsService.update(id, updateProductDto)
    }

}
