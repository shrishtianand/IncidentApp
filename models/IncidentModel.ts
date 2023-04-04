import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany } from "typeorm"
import { Employee } from "./EmployeeModel"
import { Attachment } from "./AttachmentModel"

@Entity()
export class Incident {
    @PrimaryGeneratedColumn()
    IncidentId: number

    @Column("integer")
    empID: number

    @Column("integer", {default: 0})
    ISOID: number

    @Column("integer", {default: 0})
    CISOID: number

    @Column("integer", {default: 0})
    MRID: number

    @Column("integer", {default: 0})
    investigatorID: number

    @Column("integer")
    createdBy: number
        
    @Column("text")
    description: string

    @Column("text")
    impact: string

    @Column("text",{nullable:true})
    impactPostSeverity: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    reportDateTime: string

    @Column("text",{nullable:true})
    correction: string

    @Column("text",{nullable:true})
    correctiveAction: string

    @Column("text",{nullable:true})
    rootCause: string
    
    @Column("date",{nullable:true})
    reviewDate: string

    @Column("date",{nullable:true})
    correctionDate: string

    @Column("text",{nullable:true})
    mrRemarks: string

    @Column("date",{nullable:true})
    mrDate: string

    @Column("boolean", {default: false})
    isDisplinaryReq: boolean

    @Column("text",{nullable:true})
    isoRemark: string

    @Column("date",{nullable:true})
    isoRemarkDate: string

    @Column("text",{nullable:true})
    cisoRemark: string

    @Column("text",{nullable:true})
    incidentType: string

    @Column("text",{nullable:true})
    status: string

    @Column("date",{nullable:true})
    closeDate: string

    @ManyToOne(()=> Employee, (employee) => employee.empId)
    @JoinTable()
    classes: Employee;

    @OneToMany(() => Attachment, (attachment) => attachment.Incident)
    attachments: Attachment[];
}