import { combineReducers, createStore } from "redux";
import { adminPanelReducer } from "./admin-state";
import { authReducer } from "./auth-state";
import { cartItemsReducer } from "./cart-items-state";
import { productsReducer } from "./products-state";
import { ShoppingCartReducer } from "./shopping-cart-state";

const reducers = combineReducers({
    productsState: productsReducer,
    shoppingCartState: ShoppingCartReducer,
    cartItemState: cartItemsReducer,
    adminProductState: adminPanelReducer,
    authState: authReducer
});
const store = createStore(reducers);

export default store;