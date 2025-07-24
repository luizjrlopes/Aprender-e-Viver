import admin from 'firebase-admin';

export function verifyIdToken(token: string) {
  return admin.auth().verifyIdToken(token);
}
