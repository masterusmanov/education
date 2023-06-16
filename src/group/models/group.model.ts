import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { StaffGroup } from "../../staff-group/models/staff-group.model";
import { Student } from "../../student/models/student.model";


interface GroupCreateAttr {
    name:string;
    start_year:number;
}

@Table({tableName: "group"})
export class Group extends Model<Group, GroupCreateAttr> {
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
    start_year: number;

    @HasMany(()=>StaffGroup)
    staffs: StaffGroup[]

    @HasMany(()=>Student)
    students: Student[]
}
