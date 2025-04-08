import { Button, Flex, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Translation } from "../types";

interface TranslationFormProps {
    selectedWord?: Translation;
    onSubmit: (value: Translation) => void;
    errorMessage?: string;
}

export const TranslationForm = ({
    selectedWord,
    onSubmit,
    errorMessage,
}: TranslationFormProps) => {
    const form = useForm<Translation>({
        mode: "uncontrolled",
        initialValues: {
            de: selectedWord?.de ?? "",
            hu: selectedWord?.hu ?? "",
        },
        validate: {
            hu: isNotEmpty("Word is required"),
            de: isNotEmpty("Word is required"),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex gap="md" justify="center" align="center" direction="column">
                <TextInput
                    {...form.getInputProps("de")}
                    label="German"
                    placeholder="Add word"
                    variant="filled"
                    radius="lg"
                    size="lg"
                    w='100%'
                />
                <TextInput
                    {...form.getInputProps("hu")}
                    label="Hungarian"
                    placeholder="Add word"
                    variant="filled"
                    radius="lg"
                    size="lg"
                    w='100%'
                />
                <Button
                    type="submit"
                    variant="filled"
                    color="#d0b20c"
                    radius="lg"
                    size="lg"
                >
                    Save
                </Button>
                {errorMessage}
            </Flex>
        </form>
    );
};
