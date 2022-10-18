import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_categoria"})
export class Categoria{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable: false})
    Genero: string

    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 1000, nullable: false})
    plataforma: string

     @OneToMany(() => Produto,(produto)=> produto.Categoria)
      produto: Produto[]
     static id: any
}