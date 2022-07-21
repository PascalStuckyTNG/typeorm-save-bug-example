import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoomToGuestEntity } from "./room-to-guest";

@Entity({ name: "guest" })
export class GuestEntity {

    @PrimaryColumn({ type: "varchar", length: 100 })
    name!: string;

    @PrimaryColumn({ type: "varchar", length: 100 })
    arrivalDate!: string;

    @OneToMany(
        () => RoomToGuestEntity,
        (roomToGuestEntity) => roomToGuestEntity.guest
    )
    roomToGuestEntities!: RoomToGuestEntity[];
}