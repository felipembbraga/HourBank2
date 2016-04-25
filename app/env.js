/**
 * ambiente da aplicação
 */

import Firebase from 'firebase';
import Config from './config/config'

const firebaseUrl = Config.firebase.url;

/**
 * retorna a instância do Firebase
 * @return {Firebase Object}
 */
export default function getBaseRef() {
    return new Firebase(firebaseUrl);
};
