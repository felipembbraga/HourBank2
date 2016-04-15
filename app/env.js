import Firebase from 'firebase';

const FirebaseUrl = 'https://blistering-torch-2914.firebaseio.com/';
const baseRef = new Firebase(FirebaseUrl);

export default {baseRef};
