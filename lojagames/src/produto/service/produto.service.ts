import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    findByTitulo(titulo: string): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Produto)
        private ProdutoRepository: Repository<Produto>
    ) { }
    async findAll(): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            relations: {
                Categoria: true
            }
        });
    }
    async findById(id: number): Promise <Produto> {
        let produto = await this.ProdutoRepository.findOne({

            where: {
                id
            },
            relations: {
                Categoria: true
            }

        })
        if (!produto)
        throw new HttpException ('Produto não existe', HttpStatus.NOT_FOUND)
        return produto
    }
    async findBycategoria(categoria: string): Promise<Produto[]> {
        return await this.ProdutoRepository.find({
            where: {
            Categoria: ILike(`%${categoria}%`)
            },
            relations: {
                Categoria: true
            }
        })
    }
    async create(Produto: Produto): Promise<Produto> {
        return await this.ProdutoRepository.save(Produto)
    }
    async update (produto: Produto): Promise <Produto> {

        let buscarProduto = await this.findById(produto.id)
        if (!buscarProduto || !produto.id)
        throw new HttpException ('Produto não existe', HttpStatus.NOT_FOUND)

        return await this.ProdutoRepository.save(produto)
    }
    async Delete(id: number): Promise <DeleteResult> {
        let buscarProduto = await this.findById(id)
        
        if(!buscarProduto)
            throw new HttpException ('Produto não encontrado', HttpStatus.NOT_FOUND)
        return await this.ProdutoRepository.delete(id)
    }
}
