import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { query, response } from 'express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Controller('students')
export class StudentsController {

    constructor(private readonly studentService:StudentsService){

    }


    @Get()
    findAllStudents(){
        return this.studentService.findAll();
    }

    // @Get()
    // findAllStudents(@Res() response){
    //     return response.status(200).send('All students');
    // }

    @Get(':id')
    findOne(@Param('id') id : string){
        return this.studentService.findOne(id);
    }

    @Post()
    create(@Body() createStudentDto: CreateStudentDto){
        return this.studentService.create(createStudentDto);
    }

   @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        //return `this action update a #${id} students}`
        return this.studentService.update(id,updateStudentDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        //return `This actions remove a #${id} students`
        return this.studentService.remove(id)
    }

    // @Get()
    // findAll(@Query() query){
    //     const {limit, offset} = query
    //     return `all students (limit : ${query.limit} items) - (offset: ${offset})`;
    // }
    //comme un filtrage, dans ce exemple besoin juste de 200 élève mais 20 par 20 
}
