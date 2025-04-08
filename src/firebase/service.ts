import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  DocumentSnapshot
} from "firebase/firestore";
import { db } from "./firebase";
import { Translation } from "../types";

export const converter = {
  toFirestore(): DocumentData {
    return {};
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    const data = snapshot.data(options)!;
    return data?.words.map((word: Translation) => ({
      id: word.id,
      de: word.de,
      hu: word.hu,
    }));
  },
};

export const getDictionaryArray = async () => {
  const docRef = doc(db, "dictionary", "de-hu").withConverter(converter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else {
    return { words: [] };
  }
};

export const getDictionaryFromSnapshot = (
  metaObserver: (snapshot: DocumentSnapshot<Translation[]>) => void
) => {
  try {
    const docRef = doc(db, "dictionary", "de-hu").withConverter(
      converter
    );
    return onSnapshot(docRef, metaObserver);
  } catch (error) {
    console.log(error);
  }
};

function hashCode(str: string) {
  return Array.from(str)
    .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
}

export const saveToDictionary = async (word: Translation) => {
  try {
    const docRef = doc(db, "dictionary", "de-hu");

    const id = hashCode(word.de + word.hu).toString()

    const newData = {
      id: id,
      de: word.de,
      hu: word.hu
    }
    await updateDoc(docRef, {
      words: arrayUnion(newData),
    });
    return newData
  } catch {
    console.log("no saved data");
  }
};

export const updateDictionary = async (words: Translation[]) => {
  try {
    const docRef = doc(db, "dictionary", "de-hu");

    await updateDoc(docRef, {
      words: words,
    });
    return words

  } catch {
    console.log("no saved data");
  }
}