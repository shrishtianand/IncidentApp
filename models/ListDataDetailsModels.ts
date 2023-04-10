import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Listdatamaster } from "./ListDataMasterModule";

@Entity()
export class Listdatadetails {
    @PrimaryGeneratedColumn()
    lstDtlID: number
    
    @Column("text", {nullable:false})
    lstDtlCode: string

    @Column("text")
    lstDtlDesc: string

    @ManyToOne(()=> Listdatamaster, {nullable:false})
    @JoinColumn({name: 'lstMstID'})
    lstMstID: Listdatamaster;  
}