import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; // Import logger directly
import authReducer from "../reducers/authReducer"; // Adjust the path to authReducer

const middlewares = [thunk];

// Add logger middleware only in development mode
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
});


const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

export default store;
