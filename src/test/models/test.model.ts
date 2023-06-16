import { Column, DataType, Table, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Subject } from "../../subject/models/subject.model";
import { Question } from "../../question/models/question.model";

interface TestCreateAttr{
    subject_id:number;
    name: string;
    test_count: number;
    time_limit: number;
}

@Table({tableName: "test"})
export class Test extends Model<Test, TestCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name: string;

    @Column({
        type:DataType.INTEGER,
    })
    test_count: number;

    @Column({
        type:DataType.INTEGER,
    })
    time_limit: number;

    @ForeignKey(()=>Subject)
    @Column({
        type:DataType.INTEGER,
    })
    subject_id: number;

    @BelongsTo(()=>Subject)
    subject: Subject

    @HasMany(()=>Question)
    questions: Question[]
}
