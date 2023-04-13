import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"
import { Tktappr } from "./TktApprModule"

@Entity()
export class Processstep {
    @PrimaryGeneratedColumn()
    psID: number

    @Column("text")
    psName: string

    @Column("boolean")
    sendMail: boolean

    @Column("text")
    psEmailID: string
    
}