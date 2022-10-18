import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length:200, nullable:false})
    titulo: string

    @IsNotEmpty()
    @Column({length:200,nullable:false})
    editora: string

    @Column({ length: 200, nullable: true})
    nota: string

    @ManyToOne(()=> Categoria,(Categoria)=> Categoria.plataforma, {
        onDelete:"CASCADE"
    })
     Categoria: Categoria[]
}