import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class LoginStaffDto {
    @ApiProperty({example: 'john_doe', description: "Staff login"})
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({example: 'john_doe', description: "Staff password"})
    @IsNotEmpty()
    @IsString()
    password: string;
}