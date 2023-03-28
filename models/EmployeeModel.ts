import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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
}