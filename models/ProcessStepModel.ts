import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
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

    @OneToMany(() => Tktappr, (tktappr) => tktappr.processStep)
    tktappr: Tktappr[];
}