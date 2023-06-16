import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsMobilePhone} from "class-validator";

export class UpdateSubjectDto  {
    @ApiProperty({example: 'Mathimatics', description: "Subject name"})
    @IsNotEmpty()
    @IsString()
    name:string;
}
