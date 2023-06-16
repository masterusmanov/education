import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdateStudentTestDto  {
    @ApiProperty({example: '15', description: "Correct answers count"})
    @IsNotEmpty()
    @IsInt()
    correct_count: number;
}
