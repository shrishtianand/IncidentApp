import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"
import { Incident } from "./IncidentModel"

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    empId: number
    
    @Column("text")
    firstName: string

    @Column("text")
    lastName: string

    @Column("text")
    emailID: string

    @Column("text")
    department: string

    @Column("text")
    client: string

    @Column("text")
    project: string

    @Column("boolean",{default:true})
    foundInFile: boolean 
    
    @OneToMany(() => Incident,(incident) => incident.empID)
    @JoinColumn()
    incident?: Incident
}