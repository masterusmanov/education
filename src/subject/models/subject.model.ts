import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { StaffSubject } from "../../staff-subject/models/staff-subject.model";
import { Test } from "../../test/models/test.model";


interface SubjectCreateAttr {
    name:string;
    image:string;
}

@Table({tableName: "subject"})
export class Subject extends Model<Subject, SubjectCreateAttr> {
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
        type:DataType.STRING,
    })
    image: string;

    @HasMany(()=>StaffSubject)
    staffs: StaffSubject[]

    @HasMany(()=>Test)
    tests: Test[]
}
