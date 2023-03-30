import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne } from "typeorm"
import { Incident } from "./IncidentModel"

@Entity()
export class Incidentstatus {
    @PrimaryGeneratedColumn()
    incidentID: number
    
    @Column("integer")
    statusID: number

    @Column("text")
    status: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    statusDate: string

    @Column("text")
    changedBy: string    

    @ManyToOne(()=> Incident, (incident) => incident.IncidentId)
    @JoinTable()
    classes: Incident;
}