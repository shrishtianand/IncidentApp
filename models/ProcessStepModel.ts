import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProcessStep {
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