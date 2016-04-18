import Firebase from 'firebase';

const firebaseUrl = 'https://blistering-torch-2914.firebaseio.com/';

export default function getBaseRef() {
    return new Firebase(firebaseUrl);
};
