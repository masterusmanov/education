import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdateResultDto{
    @ApiProperty({example: '1', description: "Student-Test ID"})
    @IsNotEmpty()
    @IsInt()
    student_test_id:number;
}