import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateStudentTestAnswerDto {
    @ApiProperty({example: '1', description: "Question ID"})
    @IsNotEmpty()
    @IsInt()
    question_id: number;
    @ApiProperty({example: '1', description: "Answer ID"})
    @IsNotEmpty()
    @IsInt()
    answer_id: number;
    @ApiProperty({example: '1', description: "Student-Test ID"})
    @IsNotEmpty()
    @IsInt()
    student_test_id:number;
}
