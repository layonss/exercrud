import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../service/produto.service";

@Controller("/produtos")
export class ProdutoController{
    constructor(private readonly ProdutoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Produto[]> {
        return this.ProdutoService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise <Produto>{
        return this.ProdutoService.findById(id)
    }
    @Get ('/titulo/:titulo')
    @HttpCode (HttpStatus.OK)
    findByTitulo(@Param('Titulo')titulo: string): Promise<Produto[]>{
        return this.ProdutoService.findByTitulo(titulo)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()Produto:Produto): Promise <Produto>{
        return this.ProdutoService.create(Produto)
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()Produto:Produto): Promise <Produto>{
        return this.ProdutoService.update(Produto)
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delte(@Param('id', ParseIntPipe)id:number){
        return this.ProdutoService.Delete(id)
    }
}