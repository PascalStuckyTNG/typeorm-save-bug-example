import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoomToGuestEntity } from "./room-to-guest";

@Entity({ name: "room" })
export class RoomEntity {

    @PrimaryColumn({ type: "varchar", length: 100, name: "name" })
    name!: string;

    @OneToMany(
        () => RoomToGuestEntity,
        (roomToGuestEntity) => roomToGuestEntity.room,
        {
          cascade: true
        }
    )
    roomToGuestEntities!: RoomToGuestEntity[];
}