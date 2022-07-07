import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
    type: "timestamp",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    nullable: true,
    type: "timestamp",
  })
  deletedAt!: Date;
}
