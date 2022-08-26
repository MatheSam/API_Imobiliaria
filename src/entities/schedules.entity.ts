import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
} from "typeorm";
import { Properties } from "./properties.entity";
import { Users } from "./users.entity";

@Entity("schedules")
export class Schedules {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Users, { eager: true })
  users: Users;

  @ManyToOne(() => Properties)
  properties: Properties;
}
