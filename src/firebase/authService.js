import firebaseConf from '../conf/firebaseConf.js'
import {createUserWithEmailAndPassword, getAuth , onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth" 
// import {initializeApp} from "firebase/app"
import firebaseApp from "../conf/index.js"


// const firebaseApp = initializeApp(firebaseConf.apiKey) ;

export class AuthService{
    constructor(){
        this.auth = getAuth(firebaseApp) ;
    }

    async createAccount(email , password, name){
        try {
           const userCredential =  await createUserWithEmailAndPassword(this.auth , email , password) ;

           await updateProfile(userCredential.user , {name}) ;
           console.log(userCredential.user);

            return userCredential.user ;
           
        } catch (error) {
            console.error('Firebase Error :: Creating user error :: ' , error);
        }
    }

    async login(email , password){
        try {
            await signInWithEmailAndPassword(this.auth , email , password) ;
        } catch (error) {
            console.error('Firebase Error :: user login :: error ' , error);
        }
    }

    async logout(){
        try {
            return await signOut(this.auth) ;
        } catch (error) {
            console.error('Firebase Error :: user logout :: error ' , error);
        }
    }

    async getCurrentUser(){
        try {
           return  this.auth.currentUser ;
        } catch (error) {
            console.error('Firebase Error :: user getCurrentUser :: error ' , error);
        }
    }

    onAuthStateChanged(callback) {
        return onAuthStateChanged(this.auth, (user) => {
          callback(user);
        });
      }
}


const authService = new AuthService() ;
export default authService ;

