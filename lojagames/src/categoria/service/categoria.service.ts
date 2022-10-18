import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ) { }



    async findAll(): Promise<Categoria[]> {
        return await this.CategoriaRepository.find({
            relations: {
            }
        });
    }
    async findById(id: number): Promise<Categoria> {
        let categoria = await this.CategoriaRepository.findOne({
            where: {
                id
            },
            relations: {
            }
        })
        if (!categoria)
    throw new HttpException ('Categoria não existe', HttpStatus.NOT_FOUND)
    return categoria
    }
    async findByGenero(Genero: string): Promise<Categoria[]>{
        return await this.CategoriaRepository.find({
            where: {
                Genero: ILike(`%${Genero}%`)
            },
            relations:{
                Genero: true
            }
        })
    }
    async create (Categoria:Categoria): Promise<Categoria>{
        return await this.CategoriaRepository.save(Categoria)
    }
    async update(Categoria:Categoria): Promise <Categoria>{
        let buscarCategoria = await this.findById(Categoria.id)
       
        if (!buscarCategoria || !Categoria.id)
            throw new HttpException ('Postagem não existe', HttpStatus.NOT_FOUND)
    
    return await this.CategoriaRepository.save(Categoria)
    }
    async Delete(id:number): Promise<DeleteResult> {
        let buscarCategoria = await this.findById(id)

        if (!buscarCategoria)
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        return await this.CategoriaRepository.delete(id)
    }
}