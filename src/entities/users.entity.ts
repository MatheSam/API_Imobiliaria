import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedules } from "./schedules.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: "date" })
  createdAt: Date;

  @Column({ type: "date" })
  updatedAt: Date;

  @OneToMany(() => Schedules, (schedules) => schedules.users)
  schedules: Schedules[];
}
