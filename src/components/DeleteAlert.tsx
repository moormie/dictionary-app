import { Button, Flex, Text } from "@mantine/core";
import { Translation } from "../types";

interface DeleteAlertProps {
    selectedTranslation: Translation;
    onDelete: () => void;
    errorMessage?: string;
}

export const DeleteAlert = ({
    selectedTranslation,
    onDelete,
}: DeleteAlertProps) => {
    return (
        <Flex
            direction="column"
            gap="sm"
            align="center"
        >
            <Text size="md">Are you sure you want to delete word:</Text>
            <Text size="md">
                {selectedTranslation?.de} - {selectedTranslation?.hu}
            </Text>
            <Button
                variant="filled"
                color="#f03e3e"
                radius="lg"
                onClick={onDelete}
                size="lg"
            >
                Delete
            </Button>
        </Flex>
    );
};
