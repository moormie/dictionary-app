import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
    ActionIcon,
    Button,
    Center,
    Flex,
    Group,
    SegmentedControl,
    TextInput,
    Title,
    Box,
    Image,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { ArrowBack } from "../Icons/ArrowBack";
import { useDictionaryContext } from "../context/dictionary";

interface PracticeProps {
    onBack: () => void;
}

export const Practice = ({ onBack }: PracticeProps) => {
    const {dictionary, loading} = useDictionaryContext()
    const [word, setWord] = useState<string>("");
    const [translatedWord, setTranslatedWord] = useState<string>("");
    const [wordKey, setWordKey] = useState<string>("de");
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState<string>("");
    const isCorrectAnswer =
        translatedWord.toLowerCase() === answer.toLowerCase();

    const isSmallMobile = useMediaQuery(`(max-width: 380px)`);
    const size = isSmallMobile ? "md" : "lg";

    const giveNewWord = useCallback(() => {
        const random = Math.floor(Math.random() * dictionary.length);
        const word = dictionary[random];
        const isGerman = wordKey === "de";
        setWord(word[isGerman ? "de" : "hu"]);
        setTranslatedWord(word[isGerman ? "hu" : "de"]);
        setShowAnswer(false);
        setAnswer("");
    }, [dictionary, wordKey]);

    useEffect(() => {
        if (dictionary.length > 0) {
            giveNewWord()
        }
    }, [dictionary, giveNewWord]);

    return (
        <Flex
            align="center"
            direction="column"
            mih="100dvh"
            bg="linear-gradient(0deg, rgb(214,251,251) 0%, rgb(255, 255, 255) 100%)"
        >
            <Group wrap="nowrap" p={24} w="100%">
                <ActionIcon
                    onClick={onBack}
                    size={50}
                    radius="lg"
                    aria-label="Gradient action icon"
                    color="#e3fafc"
                >
                    <ArrowBack />
                </ActionIcon>
            </Group>
            <Flex
                w="100%"
                h="calc(100dvh - 100px)"
                p={18}
                pb={0}
                bg="linear-gradient(0deg, #d2ffff 0%, rgb(141,225,228) 100%)"
                gap={isSmallMobile ? 16 : 24}
                direction="column"
                align="center"
                style={{
                    borderRadius: "32px 32px 0 0",
                }}
            >
                <SegmentedControl
                    fullWidth
                    size="sm"
                    radius="xl"
                    value={wordKey}
                    onChange={setWordKey}
                    data={[
                        { label: "From German", value: "de" },
                        { label: "From Hungarian", value: "hu" },
                    ]}
                />
                <Title order={1} my={isSmallMobile ? 0 : 'auto'}>{word}</Title>
                <TextInput
                    placeholder="translation"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    variant="filled"
                    radius="lg"
                    size={size}
                    w="100%"
                />
                {!showAnswer && (
                    <Button
                        variant="filled"
                        color="rgb(214,92,60)"
                        radius="lg"
                        size={size}
                        onClick={() => setShowAnswer(true)}
                        w={120}
                    >
                        Check
                    </Button>
                )}
                {showAnswer && (
                    <Center
                        h={50}
                        bg={isCorrectAnswer ? "#9ed9ae" : "rgb(233, 171,155)"}
                        w="100%"
                        style={{
                            borderRadius: "18px",
                            border: isCorrectAnswer
                                ? "1px solid rgb(37, 98, 61)"
                                : "1px solid #e8590c",
                        }}
                    >
                        {translatedWord}
                    </Center>
                )}
                <Button
                    variant="filled"
                    color="rgb(82,173,192)"
                    radius="lg"
                    size={size}
                    onClick={giveNewWord}
                    w={120}
                >
                    Next
                </Button>
                <Box>
                    <Image radius="md" src="/bg-image-2.png" w="auto" height={180}/>
                </Box>
            </Flex>
        </Flex>
    );
};
