import { initializeApp } from 'firebase/app';
import firebaseConfig from '../conf/firebaseConf'; // Adjust the path accordingly

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp