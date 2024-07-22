import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootState } from './reducer.ts';
import { thunk } from 'redux-thunk';


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors
    }
};

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;