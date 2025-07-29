import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import Config from './index';

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: 'service_account',
  project_id: Config.firebase.projectId,
  private_key_id: Config.firebase.privateKeyId,
  private_key: Config.firebase.privateKey.replace(/\\n/g, '\n'),
  client_email: Config.firebase.clientEmail,
  client_id: Config.firebase.clientId,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export const auth = getAuth();
export const db = getFirestore();

export default admin;
