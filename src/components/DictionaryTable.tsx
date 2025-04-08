import { ActionIcon, Table, Text, Paper } from "@mantine/core";
import { EditIcon } from "../Icons/EditIcon";
import { TrashIcon } from "../Icons/TrashIcon";
import { Translation } from "../types";

interface DictionaryTableProps {
    translationList: Translation[];
    onClickEdit: (word: Translation) => void;
    onClickDelete: (word: Translation) => void;
}

export const DictionaryTable = ({
    translationList,
    onClickEdit,
    onClickDelete,
}: DictionaryTableProps) => {
    return (
        <Paper
            withBorder
            radius="lg"
            w="100%"
            maw={600}
            style={{
                boxShadow: "none",
                overflowY: "scroll",
                overflowX: 'hidden'
            }}
        >
            <Table horizontalSpacing="md" verticalSpacing="sm" stickyHeader>
                <Table.Thead
                    c="rgb(0,9,34)"
                    bg="linear-gradient(0deg, rgb(254, 220, 182) 0%, rgb(250, 226, 200) 100%)"
                >
                    <Table.Tr>
                        <Table.Th>
                            <Text size="md" fw={700}>
                                German
                            </Text>
                        </Table.Th>
                        <Table.Th>
                            <Text size="md" fw={700}>
                                Hungarian
                            </Text>
                        </Table.Th>
                        <Table.Th />
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {translationList.map((word) => (
                        <Table.Tr key={word.id}>
                            <Table.Td>
                                <Text size="md">{word.de}</Text>{" "}
                            </Table.Td>
                            <Table.Td>
                                <Text size="md">{word.hu}</Text>
                            </Table.Td>
                            <Table.Td px={8} w={51}>
                                <ActionIcon
                                    onClick={() => onClickEdit(word)}
                                    variant="gradient"
                                    size="lg"
                                    radius="md"
                                    aria-label="Gradient action icon"
                                    gradient={{
                                        from: "#3bc9db",
                                        to: "#1098ad",
                                        deg: 90,
                                    }}
                                >
                                    <EditIcon />
                                </ActionIcon>
                            </Table.Td>
                            <Table.Td px={8} w={51}>
                                <ActionIcon
                                    onClick={() => onClickDelete(word)}
                                    variant="gradient"
                                    size="lg"
                                    radius="md"
                                    aria-label="Gradient action icon"
                                    gradient={{
                                        from: "#e8590c",
                                        to: "#f03e3e",
                                        deg: 90,
                                    }}
                                >
                                    <TrashIcon />
                                </ActionIcon>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Paper>
    );
};
