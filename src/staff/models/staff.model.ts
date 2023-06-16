import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { StaffRole } from "../../staff-role/models/staff-role.model";
import { StaffSubject } from "../../staff-subject/models/staff-subject.model";
import { StaffGroup } from "../../staff-group/models/staff-group.model";


interface StaffCreateAttr {
    first_name: string;
    last_name: string;
    image: string;
    phone_number: string;
    login: string;
    hashed_password: string;
    email: string;
    telegram_link: string;
    isActive: boolean;
}

@Table({tableName: "staff"})
export class Staff extends Model<Staff, StaffCreateAttr> {
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
        allowNull:false,
        unique: true,
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
        type:DataType.STRING,
        unique: true,
    })
    email: string;

    @Column({
        type:DataType.STRING,
    })
    telegram_link: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: true
    })
    isActive: boolean;

    @HasMany(()=>StaffRole)
    roles: StaffRole[]

    @HasMany(()=>StaffSubject)
    subjects: StaffSubject[]

    @HasMany(()=>StaffGroup)
    groups: StaffGroup[]
}
