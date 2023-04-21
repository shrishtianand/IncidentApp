import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, Index, PrimaryColumn } from "typeorm"
import { Incident } from "./IncidentModel"

@Index("unique_constraint", ['emailID','empId'], {unique:true})
@Entity()
export class Employee {
    @PrimaryColumn({type: "varchar", nullable:false})
    empId: string

    @Column("text")
    name: string

    @Column({type: "varchar", nullable:false})
    emailID: string

    @Column("text")
    department: string

    @Column("boolean",{default:true})
    foundInFile: boolean

    @Column("varchar")
    manager: string
    
    @OneToMany(() => Incident,incident => incident.employee)
    incident:Incident[]
}