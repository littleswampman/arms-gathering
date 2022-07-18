import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../Modal";
import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedTextType";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { Room } from "../../types/RoomType";
import { roomAtom } from "../../atoms/roomAtom";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

import { createRoom } from "../../services/createRoom";

export const SelectRoom: FC = () => {
    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);
    useEffect(() => {
        setDisplayedText({ texts: ["進む部屋を選択する"] });
    }, [setDisplayedText]);

    const setRoom: SetterOrUpdater<Room> = useSetRecoilState(roomAtom);

    const roomA = createRoom();
    const roomB = createRoom();

    return (
        <div className="flex items-center justify-center gap-8">
            <Button
                onClick={() => {
                    setRoom({ event: roomA.event });
                    setGameProgress("game_room");
                }}
            >
                <p>へや</p>
                <p>{roomA.event}</p>
            </Button>
            <Button
                onClick={() => {
                    setRoom({ event: roomB.event });
                    setGameProgress("game_room");
                }}
            >
                <p>へや</p>
                <p>{roomB.event}</p>
            </Button>
        </div>
    );
};
