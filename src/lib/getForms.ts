'use server'

import { FORMS_COLLECTION } from "@/services/database";
import { Form } from "@/types/form";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getForms () {
  const formsRef = collection(db, FORMS_COLLECTION);
  const querySnapshot = await getDocs(formsRef);
  return querySnapshot.docs.map(doc => doc.data() as Form);
}