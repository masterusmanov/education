import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString} from "class-validator";
export class CreateGroupDto {
    @ApiProperty({example: 'FS-23', description: "Group name"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: '2023', description: "start year of group"})
    @IsNotEmpty()
    @IsInt()
    start_year: number;
}
