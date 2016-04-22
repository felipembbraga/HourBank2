import Firebase from 'firebase';
import Config from './config/config'

const firebaseUrl = Config.firebase.url;

export default function getBaseRef() {
    return new Firebase(firebaseUrl);
};
