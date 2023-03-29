import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ListDataDetails {
    @PrimaryGeneratedColumn()
    lstDtlID: number
    
    @Column("text")
    lstDtlCode: string

    @Column("integer")
    lstDtlDesc: number

    @Column("integer")
    lstMstID: number
}