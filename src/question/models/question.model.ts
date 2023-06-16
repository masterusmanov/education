
import { Column, DataType, Table, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Test } from "../../test/models/test.model";
import { Answer } from "../../answer/models/answer.model";
import { StudentTestAnswer } from "../../student-test-answer/models/student-test-answer.model";

interface QuestionCreateAttr{
    test_id: number;
    question: string;
    isMultianswer: boolean;
}

@Table({tableName: "question"})
export class Question extends Model<Question, QuestionCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.TEXT,
        allowNull:false,
    })
    question: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    isMultianswer: boolean;

    @ForeignKey(()=>Test)
    @Column({
        type:DataType.INTEGER,
    })
    test_id: number;

    @BelongsTo(()=>Test)
    test: Test

    @HasMany(()=>Answer)
    answers: Answer[]

}
