const firebaseConf = {
    apiKey : String(import.meta.env.VITE_FIREBASE_API_KEY) ,
    firebaseUrl : String(import.meta.env.VITE_FIREBASE_URL) , 
    firebaseProjectId : String(import.meta.env.VITE_FIREBASE_PROJECT_ID) ,
   
}

export default firebaseConf ;