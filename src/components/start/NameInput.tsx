import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog } from "@headlessui/react";

import { Modal } from "../Modal";
import { Button } from "../Button";

import { DisplayedText } from "../../types/DisplayedText";
import { displayedTextAtom } from "../../atoms/displayedTextAtom";

import { AllStatus } from "../../types/AllStatus";
import { allStatusAtom } from "../../atoms/allStatusAtom";
import { allStatusSelector } from "../../selectors/allStatusSelector";

import { GameProgress } from "../../types/GameProgress";
import { gameProgressAtom } from "../../atoms/gameProgressAtom";
import { gameProgressSelector } from "../../selectors/gameProgressSelector";

export const NameInput: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);

    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    const setGameProgress: SetterOrUpdater<GameProgress> =
        useSetRecoilState(gameProgressAtom);
    const gameProgress = useRecoilValue(gameProgressSelector);

    // NOTE 開発用のconsole.log
    useEffect(() => {
        console.log(allStatus);
    }, [allStatus]);

    const [characterName, setCharacterName] = useState("");
    const [characterAge, setCharacterAge] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    setDisplayedText({ texts: ["名前・年齢を決める"] });

    const changeCharacterName = (event: React.ChangeEvent<HTMLInputElement>) =>
        setCharacterName(event.target.value);

    const confirmCharacter = (name: string, age: number) => {
        // 名前だけを確定させる
        setAllStatus({
            ...allStatus,
            character: {
                name,
                age,
            },
        });
    };

    return (
        <div className="flex">
            <div className="flex rounded-sm border-2">
                <input
                    type="text"
                    className="text-gray-900"
                    defaultValue={characterName}
                    onChange={(e) => changeCharacterName(e)}
                />
                <Button
                    onClick={() => {
                        setCharacterAge(Math.ceil(Math.random() * 100));
                        openModal();
                    }}
                >
                    OK
                </Button>
            </div>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    これで確定しますか?
                </Dialog.Title>
                <div className="mt-2 flex flex-col justify-center">
                    <p className="pl-4 text-4xl text-gray-500">
                        name:{characterName}
                    </p>
                    <p className="pl-4 text-4xl text-gray-500">
                        age:{characterAge}
                    </p>
                </div>

                <div className="mt-4 flex justify-between gap-4">
                    <Button
                        onClick={() => {
                            confirmCharacter(characterName, characterAge);
                            closeModal();
                            setGameProgress("start_select-arms");
                        }}
                    >
                        Ok
                    </Button>
                    <Button onClick={closeModal}>No</Button>
                </div>
            </Modal>
        </div>
    );
};
