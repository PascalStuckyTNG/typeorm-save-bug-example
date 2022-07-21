import { GuestEntity } from "../src/guest";
import { RoomEntity } from "../src/room";
import { DataSource, Repository } from "typeorm";
import { RoomToGuestEntity } from "../src/room-to-guest";
import { Room } from "../src/types";

describe("Repository", () => {
    let dataSource: DataSource;
    let roomRepository: Repository<RoomEntity>;

    beforeEach(async () => {
        dataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [
              RoomEntity,
              GuestEntity,
              RoomToGuestEntity
            ],
            synchronize: true,
            logging: true
        });
        await dataSource.initialize();
        roomRepository = dataSource.getRepository(RoomEntity);
    })

    it("Saves and updates an entity", async () => {
        //given
        const roomObject: Room = {
            name: "Room1",
            guests: [
                {
                    name: "Guest1",
                    arrivalDate: "2022-07-21"
                }
            ],
        };
        const roomEntityObject = {
            name: roomObject.name,
            roomToGuestEntities: roomObject.guests.map((guest) => ({
                guest,
                roomObject
            }))
        };
        const roomEntity = roomRepository.create(roomEntityObject);
        await roomRepository.save(roomEntity);

        // when
        const savedRoomEntity = await roomRepository.save(roomEntity);
        const storedRoomEntity = await roomRepository.findOne({
            where: {name: roomObject.name},
            relations: [
                "roomToGuestEntities",
                "roomToGuestEntities.guest"
            ]
        });

        // then
        expect(savedRoomEntity).toEqual(storedRoomEntity);
    });
})