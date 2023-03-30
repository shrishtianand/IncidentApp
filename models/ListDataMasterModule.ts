import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Listdatamaster {
    @PrimaryGeneratedColumn()
    lstMstID: number
    
    @Column("text")
    lstMstCode: string

    @Column("text")
    lstMstDesc: string
}