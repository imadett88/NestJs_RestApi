import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {

    //l'injection des dépendances
    constructor(
      @InjectRepository(Student)
        private readonly studentRepository : Repository<Student>,
      @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>
    ){}
    
    
    async findAll(): Promise<Student[]> {
      return this.studentRepository.find({
        relations:['courses'] //find all data of students and also add the courses
      });
    }

    async findOne(id: number): Promise<Student>{
        const student = this.studentRepository.findOne({
            where:{id}
        });
        if (!student){
            //throw new HttpException(`this is : ${id} not found`,HttpStatus.NOT_FOUND)
            throw new NotFoundException(`This student : ${id} not found`);
        }                           
        return student;
    }

    async create(createStudentDto: CreateStudentDto) {


      const courses = await Promise.all(
        createStudentDto.courses.map(x => this.preloadCourseByName(x))
      );

      const student = this.studentRepository.create({
        ...createStudentDto,
        courses
      })
      return this.studentRepository.save(student);
    }

    async update(id: string, updateStudentDto: UpdateStudentDto) {

      const courses = updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map(x => this.preloadCourseByName(x))
      ))

        const updateStudent = await this.studentRepository.preload({ //preload : check if the student exist
            id: +id,
            ...updateStudentDto,
            courses
        })
        if (!updateStudent){
            //this.students.push(updateStudentDto);
            throw new NotFoundException(`This student : ${id} not found`);
        }
        return this.studentRepository.save(updateStudent);
      }

      async remove(id:string){
        await this.studentRepository.delete(id);
          
      }

      private async preloadCourseByName(name: string):Promise<Course>{
        const course = await this.courseRepository.findOne({
          where: {name}
        })
        if(course) {
          return course
        }
        return this.courseRepository.create({name});
      }
  
}
