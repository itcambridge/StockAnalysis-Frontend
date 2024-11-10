import React, { useState, useEffect } from 'react';
import StockAnalysis from './components/StockAnalysis';
import Portfolio from './components/Portfolio';
import CreditCycle from './components/CreditCycle';
import FirebaseTest from './components/FirebaseTest';  // Add this line
import { auth } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './App.css';

function App() {
  // ... rest of your App component code ...

  return (
    <div className="App" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <FirebaseTest />  {/* Add this line to test Firebase */}
      {/* ... rest of your JSX ... */}
    </div>
  );
}

export default App;