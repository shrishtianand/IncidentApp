import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Processstep {
    @PrimaryGeneratedColumn()
    psID: number
    
    @Column("integer")
    psNumber: number

    @Column("text")
    psName: string

    @Column("boolean")
    sendMail: boolean

    @Column("text")
    psEmailId: string
}