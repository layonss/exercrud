import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../service/categoria.service";

@Controller("/categorias")
export class CategoriaController{
    constructor(private readonly CategoriaService: CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    finAll(): Promise<Categoria[]>{
        return this.CategoriaService.findAll();
    }
    @Get('/Genero/:Genero')
    @HttpCode (HttpStatus.OK)
    findByGenero(@Param('Genero') Genero: string): Promise <Categoria[]>{
        return this.CategoriaService.findByGenero(Genero)
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id:number): Promise <Categoria>{
        return this.CategoriaService.findById(id)
    }
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body()Categoria:Categoria): Promise <Categoria>{
        return this.CategoriaService.create(Categoria)
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update (@Body()Categoria:Categoria): Promise <Categoria>{
        return this.CategoriaService.update(Categoria)
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    Delete(@Param('id',ParseIntPipe)id:number){
        return this.CategoriaService.Delete(id)
    }
}
