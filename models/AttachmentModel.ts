import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
    incidentID: number
    
    @Column("text")
    type: string

    @Column("text")
    key: string

    @Column("text")
    value: string

    @Column("text")
    name: string    
}