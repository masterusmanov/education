import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsMobilePhone} from "class-validator";
export class CreateTestDto {
    @ApiProperty({example: '1', description: "Subject ID"})
    @IsNotEmpty()
    @IsInt()
    subject_id:number;
    @ApiProperty({example: '1', description: "Test name"})
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({example: '15', description: "Questions count in test"})
    @IsNotEmpty()
    @IsInt()
    test_count: number;
    @ApiProperty({example: '30', description: "Time limit for test"})
    @IsNotEmpty()
    @IsInt()
    time_limit: number;
}
