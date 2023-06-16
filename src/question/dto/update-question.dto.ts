import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdateQuestionDto {
    @ApiProperty({example: '1', description: "test ID"})
    @IsOptional()
    @IsInt()
    test_id?: number;
    @ApiProperty({example: 'What is the highest Mountain?', description: "The question itself"})
    @IsOptional()
    @IsString()
    question?: string;
    @ApiProperty({example: 'true', description: "true is question has more then one answer"})
    @IsBoolean()
    @IsOptional()
    isMultianswer?: boolean;
}
