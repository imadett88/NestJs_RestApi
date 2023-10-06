import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "../create-student.dto/create-student.dto";


export class UpdateStudentDto extends PartialType(CreateStudentDto){  
    //ont fait comme ça ici juste en est les meme attributs  
}
