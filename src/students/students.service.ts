import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    private students : Student[] = [
        {
            id:1,
            name:"John",
            age:30,
            address: ['Maroc','Casa']
        },
        {
            id:2,
            name:"Imad",
            age:22,
            address: ['Maroc','Jadida']
        },
    ]
    
    async findAll() {
      return this.students;
    }

    async findOne(id: string){
        //+ ici juste convert en number
        const student = this.students.find(x => x.id === +id)  
        if (!student){
            throw new HttpException(`this is : ${id} not found`,HttpStatus.NOT_FOUND)
            throw new NotFoundException;
        }                           
        return this.students;
    }

    async create(createStudentDto:any) {
      this.students.push(createStudentDto);
    }

    async update(id: string, updateStudentDto:any) {
        const updateStudent = this.findOne(id);
        if (updateStudent){
            //this.students.push(updateStudentDto);
        }
      }

      remove(id:string){
          const removeStudent = this.students.findIndex(x => x.id === +id);
          if(removeStudent >= 0){
            return this.students.splice(removeStudent,1);
          }
      }
  
}
