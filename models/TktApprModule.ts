import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
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

    @ManyToOne(()=> Processstep,processStep => processStep.psID)
    processStep: Processstep;   
    
}