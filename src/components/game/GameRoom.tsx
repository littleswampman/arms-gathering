import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../Modal";
import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedTextType";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { AllStatus } from "../../types/AllStatusType";
import { allStatusAtom } from "../../atoms/allStatusAtom";
import { allStatusSelector } from "../../selectors/allStatusSelector";

import { GameProgress } from "../../types/GameProgressType";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

import { Room } from "../../types/RoomType";
import { roomAtom } from "../../atoms/roomAtom";
import { roomSelector } from "../../selectors/roomSelector";

export const GameRoom = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);

    const room = useRecoilValue(roomSelector);

    useEffect(() => {
        setDisplayedText({ texts: [`Room: ${room.event}`] });
    }, [room.event, setDisplayedText]);

    return (
        <Button
            onClick={() => {
                setGameProgress("game_select-room");
            }}
        >
            Room
        </Button>
    );
};
