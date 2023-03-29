import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class IncidentStatus {
    @PrimaryGeneratedColumn()
    incidentID: number
    
    @Column("integer")
    statusID: number

    @Column("text")
    status: string

    @Column("datetime")
    statusDate: string

    @Column("text")
    changedBy: string    
}