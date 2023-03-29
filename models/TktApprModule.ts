import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TktAppr {
    @PrimaryGeneratedColumn()
    tktkId: number
    
    @Column("text")
    tktName: string

    @Column("text")
    tktApproveName: string

    @Column("text")
    tktApprove: string

    @Column("text")
    tktStatus: string    
}