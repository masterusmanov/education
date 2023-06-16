import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsMobilePhone, IsEmail} from "class-validator";
export class CreateStaffDto {
    @ApiProperty({example: 'John', description: "Staff first name"})
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @ApiProperty({example: 'Doe', description: "Staff last name"})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({example: '+998991112233', description: "Staff phone number"})
    @IsNotEmpty()
    @IsMobilePhone('uz-UZ')
    phone_number: string;

    @ApiProperty({example: 'example@mail.com', description: "Staff email"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: 'https://t.me/nickname', description: "Staff telegram link"})
    @IsNotEmpty()
    @IsString()
    telegram_link: string;
}
