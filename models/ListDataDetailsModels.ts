import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ListDataDetails {
    @PrimaryGeneratedColumn()
    listdtid: number
    
    @Column("text")
    listdtlcode: string

    @Column("integer")
    listdtldesc: number

    @Column("integer")
    listmstid: number
}