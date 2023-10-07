import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";


@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    age: number;

    @Column('json',{nullable:true}) //nullable = not required (optional)
    address:string[];

    @JoinTable()
    @ManyToMany(type=> Course, 
        course => course.students,{cascade:true} //cascade: if we delete a student w delete the courses
        )
        courses:Course[];

}