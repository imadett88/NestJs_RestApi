import { IsNumber, IsString } from "class-validator";

export class CreateStudentDto {


    @IsString()
    readonly name: string;

    @IsNumber()
    readonly age: number;

    @IsString({each: true}) //each: true  => all is string(tous les valeures)
    readonly address:string[];

    @IsString({each: true}) 
    readonly courses:string[];
}
