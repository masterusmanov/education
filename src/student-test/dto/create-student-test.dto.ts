import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateStudentTestDto {
    @ApiProperty({example: '1', description: "Student ID"})
    @IsNotEmpty()
    @IsInt()
    student_id: number;

    @ApiProperty({example: '1', description: "Test ID"})
    @IsNotEmpty()
    @IsInt()
    test_id: number;
}
