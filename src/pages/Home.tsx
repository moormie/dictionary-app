import { Box, Button, Image, Flex, Space } from "@mantine/core";

interface HomeProps {
    onClickPractice: () => void;
    onClickDictionary: () => void;
}

export const Home = ({ onClickPractice, onClickDictionary }: HomeProps) => {
    return (
        <Flex
            justify="center"
            align="center"
            direction="column"
            p={24}
            mih="100dvh"
            bg="rgb(217,254,254)"
        >
            <Box pos="absolute" bottom="50%" m="auto">
                <Image src="/bg-image.png" w="auto" height={200} />
            </Box>
            <Box
                w="100%"
                pos="absolute"
                bottom={0}
                bg="linear-gradient(0deg, #d2ffff 0%, rgb(141,225,228) 100%)"
                h="50%"
                p={40}
                style={{
                    borderRadius: "32px 32px 0 0",
                }}
            >
                <Button
                    variant="filled"
                    color="rgb(82,173,192)"
                    c="rgb(0,9,34)"
                    radius="lg"
                    size="lg"
                    onClick={onClickPractice}
                    maw={400}
                    m="auto"
                    fullWidth
                >
                    Practice
                </Button>
                <Space h="xl" />
                <Button
                    variant="filled"
                    color="rgb(82,173,192)"
                    c="rgb(0,9,34)"
                    radius="lg"
                    size="lg"
                    onClick={onClickDictionary}
                    maw={400}
                    m="auto"
                    fullWidth
                >
                    Dictionary
                </Button>
            </Box>
        </Flex>
    );
};
