import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import Config from './index';

// Initialize Firebase Admin SDK
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

try {
  // Check if we have valid Firebase credentials
  const hasValidCredentials =
    Config.firebase.projectId &&
    Config.firebase.projectId !== 'fake-project' &&
    Config.firebase.privateKey &&
    Config.firebase.privateKey !== 'fake-key' &&
    !Config.firebase.privateKey.includes('-----BEGIN PRIVATE KEY-----\\nfake-key');

  if (hasValidCredentials && !admin.apps.length) {
    const serviceAccount = {
      type: 'service_account',
      project_id: Config.firebase.projectId,
      private_key_id: Config.firebase.privateKeyId,
      private_key: Buffer.from(Config.firebase.privateKey, 'base64').toString('utf-8'),
      client_email: Config.firebase.clientEmail,
      client_id: Config.firebase.clientId,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    auth = getAuth();
    db = getFirestore();
  } else {
    console.warn('⚠️  Firebase not initialized - invalid or missing credentials (this is OK for testing)');
  }
} catch (error: any) {
  console.warn('⚠️  Firebase initialization failed:', error.message, '(this is OK for testing)');
}

export { auth, db };
export default admin;
