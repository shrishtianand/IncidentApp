import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ListDataMaster {
    @PrimaryGeneratedColumn()
    lstMstID: number
    
    @Column("text")
    lstMstCode: string

    @Column("text")
    lstMstDesc: string
}