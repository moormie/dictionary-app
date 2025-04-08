import { useEffect, useState } from "react";
import { saveToDictionary, updateDictionary } from "../firebase/service";
import {
    ActionIcon,
    Button,
    Center,
    Flex,
    Group,
    Loader,
    Modal,
    TextInput,
    CloseIcon,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { DictionaryTable } from "../components/DictionaryTable";
import { TranslationForm } from "../components/TranslationForm";
import { DeleteAlert } from "../components/DeleteAlert";
import { ArrowBack } from "../Icons/ArrowBack";
import { Magnifier } from "../Icons/Magnifier";
import { Translation } from "../types";
import { useDictionaryContext } from "../context/dictionary";

interface DictionaryProps {
    onBack: () => void;
}

export const Dictionary = ({ onBack }: DictionaryProps) => {
    const { dictionary, loading } = useDictionaryContext();
    const [errorMessage, setErrorMessage] = useState("");
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedTranslation, setSelectedTranslation] = useState<
        Translation | undefined
    >();
    const [modalType, setModalType] = useState<
        "add" | "edit" | "delete" | undefined
    >();
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredDictionary, setFilteredDictionary] = useState<Translation[]>(
        []
    );

    const onSave = async (newTranslation: Translation) => {
        const result = await saveToDictionary(newTranslation);
        if (result) {
            close();
        }
    };

    const onUpdate = async (newWord: Translation) => {
        if (selectedTranslation) {
            const index = dictionary.findIndex(
                (word) => word.id === selectedTranslation?.id
            );
            dictionary[index] = { id: selectedTranslation.id, ...newWord };
            const result = await updateDictionary(dictionary);
            if (result) {
                close();
            }
        }
    };

    const onDelete = async () => {
        if (selectedTranslation) {
            const index = dictionary.findIndex(
                (word) => word.id === selectedTranslation?.id
            );
            dictionary.splice(index, 1);
            const result = await updateDictionary(dictionary);
            if (result) {
                close();
            }
        }
    };

    const openModal = (type: "add" | "edit" | "delete", word?: Translation) => {
        setModalType(type);
        setSelectedTranslation(word);
        open();
    };

    useEffect(() => {
        if (searchValue) {
            const value = searchValue.toLowerCase();
            const result = dictionary.filter(
                ({ de, hu }) =>
                    de.toLowerCase().includes(value) ||
                    hu.toLowerCase().includes(value)
            );
            setFilteredDictionary(result);
        }
    }, [searchValue, dictionary]);

    return (
        <Flex
            align="center"
            direction="column"
            mih="100dvh"
            bg="linear-gradient(0deg, rgb(214,251,251) 0%, rgb(255, 255, 255) 100%)"
        >
            <Group justify="space-between" wrap="nowrap" p={24} w="100%">
                <ActionIcon
                    onClick={onBack}
                    size={50}
                    radius="lg"
                    aria-label="Gradient action icon"
                    color="#e3fafc"
                >
                    <ArrowBack />
                </ActionIcon>
                <TextInput
                    placeholder="Search word"
                    size="lg"
                    radius="lg"
                    variant="filled"
                    rightSectionPointerEvents="all"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    leftSection={<Magnifier aria-label="Search" />}
                    rightSection={
                        <CloseIcon
                            aria-label="Clear"
                            onClick={() => setSearchValue("")}
                        />
                    }
                />
            </Group>
            <Flex
                w="100%"
                p={18}
                bg="linear-gradient(0deg, #d2ffff 0%, rgb(141,225,228) 100%)"
                h="calc(100dvh - 100px)" /* or position:absolute; height:100%; */
                direction="column"
                style={{
                    borderRadius: "32px 32px 0 0",
                }}
            >
                <Center>
                    <Button
                        variant="filled"
                        color="#1098ad"
                        radius="lg"
                        onClick={() => openModal("add")}
                        size="lg"
                        m={24}
                    >
                        Add New Translation
                    </Button>
                </Center>
                {loading ? (
                    <Center p={24}>
                        <Loader size={50} color="#1098ad" />
                    </Center>
                ) : (
                    <Flex flex={1} mih={0} justify="center">
                        <DictionaryTable
                            translationList={
                                searchValue ? filteredDictionary : dictionary
                            }
                            onClickEdit={(word) => openModal("edit", word)}
                            onClickDelete={(word) => openModal("delete", word)}
                        />
                    </Flex>
                )}
            </Flex>
            <Modal
                opened={opened}
                onClose={close}
                radius={"lg"}
                title={
                    modalType === "add"
                        ? "Add New Translation"
                        : modalType === "edit"
                        ? "Edit Translation"
                        : "Delete Translation"
                }
                centered
            >
                {modalType === "add" && (
                    <TranslationForm
                        onSubmit={onSave}
                        errorMessage={errorMessage}
                    />
                )}
                {modalType === "edit" && (
                    <TranslationForm
                        selectedWord={selectedTranslation}
                        onSubmit={onUpdate}
                        errorMessage={errorMessage}
                    />
                )}
                {modalType === "delete" && selectedTranslation && (
                    <DeleteAlert
                        selectedTranslation={selectedTranslation}
                        onDelete={onDelete}
                    />
                )}
            </Modal>
        </Flex>
    );
};
