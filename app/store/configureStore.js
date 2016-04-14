import {AsyncStorage} from 'react-native';
import {applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import createLogger from 'redux-logger';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

// ativa o logger quando está em desenvolvimento
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// configura o logger middleware
const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

// aplica os middlewares definidos no createStore
const createHBStore = applyMiddleware(thunkMiddleware, ReduxPromise, logger)(createStore);

/**
 * Configura o store para a aplicação
 * @param  {()=>} onComplete: função de callback chamada após a configuração
 * @return void
 */
export default function configureStore(onComplete: ?() => void) {

  // Inicializa o store com autoRehydrate
  const store = autoRehydrate()(createHBStore)(reducers);

  // Persiste os dados no AsyncStorage e chama a função de callback
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
