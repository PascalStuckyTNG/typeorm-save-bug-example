import * as t from "io-ts";

const guestDecoder = t.type({
    name: t.string,
    arrivalDate: t.string
});


const roomDecoder = t.type({
    name: t.string,
    guests: t.array(guestDecoder),
});

export type Room = t.TypeOf<typeof roomDecoder>;

export type Guest = t.TypeOf<typeof guestDecoder>;