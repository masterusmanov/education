import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Group } from "../../group/models/group.model";

interface StudentCreateAttr {
    group_id: number;
    first_name: string;
    last_name: string;
    image: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    isActive: boolean;
}

@Table({tableName: "student"})
export class Student extends Model<Student, StudentCreateAttr> {
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
    first_name: string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    last_name: string;

    @Column({
        type:DataType.STRING,
    })
    image: string;

    @Column({
        type:DataType.STRING,
    })
    phone_number: string;

    @Column({
        type:DataType.STRING,
        unique: true,
    })
    login: string;

    @Column({
        type:DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    isActive: boolean;

    @ForeignKey(()=>Group)
    @Column({
        type:DataType.INTEGER,
    })
    group_id:number;

    @BelongsTo(()=>Group)
    group: Group
}
