import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Get localStorage object from window setting it as default => user import { sessionStorage } (read docs)

 import userReducer from './user/user.reducer';
 import cartReducer from './cart/cart.reducer';
 import directoryReducer from './directory/directory.reducer';
 import shopReducer from './shop/shop.reducer';

 // config
 const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['cart'] // list of reducers - not persisting user because firebase is handling it
 } 

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

 export default persistReducer(persistConfig, rootReducer);