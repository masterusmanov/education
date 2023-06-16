import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdatePasswordDto {
    @ApiProperty({example: 'old password', description: "Staff old password"})
    @IsNotEmpty()
    @IsString()
    oldPassword: string;
    @ApiProperty({example: 'new password', description: "Staff new password"})
    @IsNotEmpty()
    @IsString()
    newPassword: string;
    @ApiProperty({example: 'confirm new password', description: "confirm password"})
    @IsNotEmpty()
    @IsString()
    confirm_password: string;
}