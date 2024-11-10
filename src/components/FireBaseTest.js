// src/components/FirebaseTest.js
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

function FirebaseTest() {
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
  };

  console.log('Firebase Config:', config);

  try {
    const app = initializeApp(config);
    const auth = getAuth(app);
    console.log('Firebase initialized successfully:', auth);
    return <div>Firebase connection successful! Check console for details.</div>;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return <div>Firebase connection failed. Check console for errors.</div>;
  }
}

export default FirebaseTest;