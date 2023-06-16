
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsEmail, IsMobilePhone} from "class-validator";
export class UpdateStaffDto {
    @ApiProperty({example: 'john', description: "Staff first name"})
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty({example: 'doe', description: "Staff last name"})
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiProperty({example: 'example@mail.com', description: "Staff email"})
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({example: 'john_doe', description: "Staff login"})
    @IsOptional()
    @IsString()
    login?: string;

    @ApiProperty({example: '+998991112233', description: "Staff phone number"})
    @IsOptional()
    @IsMobilePhone('uz-UZ')
    phone_number?: string;

    @ApiProperty({example: 'https://t.me/nickname', description: "Staff telegram link"})
    @IsOptional()
    @IsString()
    telegram_link?: string;
}
