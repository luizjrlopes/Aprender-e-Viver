// Exemplo de configuração de banco usando Firebase
import admin from "firebase-admin";
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
export const db = admin.firestore();