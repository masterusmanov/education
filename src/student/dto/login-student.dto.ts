import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class LoginStudentDto{
    @ApiProperty({example: 'John_doe', description: "Student login"})
    @IsNotEmpty()
    @IsString()
    login: string;
    @ApiProperty({example: 'john_doe', description: "Student password"})
    @IsNotEmpty()
    @IsString()
    password: string;
}