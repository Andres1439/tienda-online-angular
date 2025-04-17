import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: 'AIzaSyD1o8SSr-cUZn6LRiAXzKvxua0amS6KJMY',
    authDomain: 'tienda-online-de883.firebaseapp.com',
    databaseURL: 'https://tienda-online-de883-default-rtdb.firebaseio.com',
    projectId: 'tienda-online-de883',
    storageBucket: 'tienda-online-de883.firebasestorage.app',
    messagingSenderId: '73978998197',
    appId: '1:73978998197:web:6f8bcf6c78ccc75c087dfc',
    measurementId: 'G-BPM2B25E87',
  };

  public auth: Auth;
  public firebase: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
  }
}
