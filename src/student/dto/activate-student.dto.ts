import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class ActivateStudentDto{
    @ApiProperty({example: '1', description: "Student ID"})
    @IsNotEmpty()
    @IsInt()
    student_id: number;
}