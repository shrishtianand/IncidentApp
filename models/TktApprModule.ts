import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Processstep } from "./ProcessStepModel"

@Entity()
export class Tktappr {
    @PrimaryGeneratedColumn()
    tktID: number
    
    @Column("text")
    tktName: string

    @Column("text")
    tktApproverID: string

    @Column("text")
    tktApprove: string

    @Column("text")
    tktStatus: string   

    @ManyToOne(()=> Processstep, {nullable:false})
    @JoinColumn({name: 'psID'})
    processStep: Processstep;  
    
}