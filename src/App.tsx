import { useState } from "react";
import "./App.css";
import { MantineProvider, Box } from "@mantine/core";
import "@mantine/core/styles.css";
import { Dictionary } from "./pages/Dictionary";
import { Home } from "./pages/Home";
import { Practice } from "./pages/Practice";
import { DictionaryContextProvider } from "./context/dictionary";

function App() {
    const [page, setPage] = useState<"home" | "practice" | "dictionary">(
        "home"
    );

    return (
        <DictionaryContextProvider>
            <MantineProvider theme={{ fontFamily: "Comfortaa, sans-serif" }}>
                <Box mih="100dvh">
                    {page === "home" && (
                        <Home
                            onClickPractice={() => setPage("practice")}
                            onClickDictionary={() => setPage("dictionary")}
                        />
                    )}
                    {page === "dictionary" && (
                        <Dictionary onBack={() => setPage("home")} />
                    )}
                    {page === "practice" && (
                        <Practice onBack={() => setPage("home")} />
                    )}
                </Box>
            </MantineProvider>
        </DictionaryContextProvider>
    );
}

export default App;
