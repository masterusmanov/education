import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsOptional} from "class-validator";
export class UpdateGroupDto  {
    @ApiProperty({example: 'FS-23', description: "Group name"})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({example: '2023', description: "start year of group"})
    @IsOptional()
    @IsInt()
    start_year?: number;
}
