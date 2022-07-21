import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GuestEntity } from "./guest";
import { RoomEntity } from "./room";

@Entity({ name: "room_guest" })
export class RoomToGuestEntity {

    @PrimaryColumn({ type: "varchar", length: 100, name: "room_name" })
    roomName!: string;

    @PrimaryColumn({ type: "varchar", length: 100, name: "guest_name" })
    guestName!: string;

    @PrimaryColumn({ type: "varchar", length: 100, name: "guest_arrival_date" })
    guestArrivalDate!: string;

    @ManyToOne(
        () => GuestEntity,
        (guestEntity) => guestEntity.roomToGuestEntities,
        {
          cascade: true
        }
    )
    @JoinColumn([
        { name: "guest_name", referencedColumnName: "name" },
        { name: "guest_arrival_date", referencedColumnName: "arrivalDate" }
    ])
    guest!: GuestEntity;

    @ManyToOne(
        () => RoomEntity,
        (roomEntity) => roomEntity.roomToGuestEntities,
        {
          orphanedRowAction: "delete"
        }
    )
    @JoinColumn([
        { name: "room_name", referencedColumnName: "name" }
    ])
    room!: RoomEntity;
}