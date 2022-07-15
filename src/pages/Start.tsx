import React, { FC, useState, useEffect } from "react";
import { useSetRecoilState, SetterOrUpdater, useRecoilValue } from "recoil";

import { Dialog, Transition } from "@headlessui/react";

import { Layout } from "../layout/Layout";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { DisplayedText } from "../types/DisplayedText";
import { displayedTextAtom } from "../atoms/displayedTextAtom";
import { TextDisplay } from "../components/TextDisplay";

import { AllStatus } from "../types/AllStatus";
import { allStatusAtom } from "../atoms/allStatus";
import { allStatusSelector } from "../selectors/allStatus";

export const Start: FC = () => {
    const setDisplayedText: SetterOrUpdater<DisplayedText> =
        useSetRecoilState(displayedTextAtom);
    const setAllStatus: SetterOrUpdater<AllStatus> =
        useSetRecoilState(allStatusAtom);
    const allStatus = useRecoilValue(allStatusSelector);

    // NOTE 開発用のconsole.log
    useEffect(() => {
        console.log(allStatus);
    }, [allStatus]);

    setDisplayedText({
        texts: ["a迷aaa宮にa潜る"],
        // 半角文字と全角文字を混ぜても正しく表示されるかのテスト
    });
    const [characterName, setCharacterName] = useState("aaa");
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openModal = () => {
        setIsOpen(true);
    };

    const changeCharacterName = (event: React.ChangeEvent<HTMLInputElement>) =>
        setCharacterName(event.target.value);

    const confirmCharacterName = (name: string) => {
        // 名前だけを確定させる
        setAllStatus({
            ...allStatus,
            character: {
                name,
                age: allStatus.character.age,
            },
        });
    };

    return (
        <Layout>
            <div className="relative h-full w-full">
                <div>Start</div>
                <div className="flex">
                    <div className="flex rounded-sm border-2">
                        <input
                            type="text"
                            className="text-gray-900"
                            defaultValue={characterName}
                            onChange={(e) => changeCharacterName(e)}
                        />
                        <Button onClick={openModal}>OK</Button>
                    </div>

                    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            この名前で確定しますか?
                        </Dialog.Title>
                        <div className="mt-2 flex justify-center">
                            <p className="text-4xl  text-gray-500">
                                {characterName}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-between gap-4">
                            <Button
                                onClick={() => {
                                    confirmCharacterName(characterName);
                                    closeModal();
                                }}
                            >
                                Ok
                            </Button>
                            <Button onClick={closeModal}>No</Button>
                        </div>
                    </Modal>
                </div>
                <div className="absolute bottom-0 w-full">
                    <TextDisplay />
                </div>
            </div>
        </Layout>
    );
};
