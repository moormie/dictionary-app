import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { Translation } from "../types";
import {
    getDictionaryFromSnapshot,
} from "../firebase/service";
import { DocumentSnapshot } from "firebase/firestore";

interface ContextData {
    dictionary: Translation[];
    loading: boolean;
}
export const DictionaryContext = createContext<ContextData>({
    dictionary: [],
    loading: true,
});

type Props = {
    children?: React.ReactNode;
};

export const DictionaryContextProvider = ({ children }: Props) => {
    const [dictionary, setDictionary] = useState<Translation[]>([]);
    const [loading] = useState(false);

    const observer = useCallback(
        (snapshot: DocumentSnapshot<Translation[]>) => {
            const result = snapshot.data();
            if (result) {
                setDictionary(result);
            }
        },
        []
    );

    useEffect(() => {
        const unsub = getDictionaryFromSnapshot(observer);

        if (unsub) {
            return () => unsub();
        }
    }, [observer]);

    return (
        <DictionaryContext.Provider
            value={{ dictionary, loading }}
        >
            {children}
        </DictionaryContext.Provider>
    );
};

export const useDictionaryContext = () => {
    const store = useContext(DictionaryContext);
    return store;
};
