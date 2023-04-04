import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Incident } from "./IncidentModel"

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn()
    attachmentId: number
    
    // @Column("text")
    // type: string

    // @Column("text")
    // key: string

    // @Column("text")
    // value: string

    @Column("text")
    name: string    

    @ManyToOne(()=> Incident)
    Incident: Incident;
}