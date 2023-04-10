import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"
import { Listdatadetails } from "./ListDataDetailsModels"

@Entity()
export class Listdatamaster {
    @PrimaryGeneratedColumn()
    lstMstID: number
    
    @Column("text", {nullable:false})
    lstMstCode: string

    @Column("text")
    lstMstDesc: string

    @OneToMany(() => Listdatadetails, (Listdatadetails) => Listdatadetails.lstMstID )
    @JoinColumn({name: 'lstMstID'})
    listdatadetails: Listdatadetails[]
}