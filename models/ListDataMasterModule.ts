import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ListDataMaster {
    @PrimaryGeneratedColumn()
    ListmstId: number
    
    @Column("text")
    ListCode: string

    @Column("text")
    ListDescription: string
}