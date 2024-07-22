import { combineReducers } from 'redux';
import { SET_SELECTED_STOCK, SET_STOCK_DATA } from './action.ts';
import { SET_STOCK_IMAGE } from './action.ts';

interface Stock {
    _id: string;
    current_price: number;
    timeStamp: string;
}

interface StockDataState {
    stockData: {
        [key: string]: Stock[];
    };
}

const initialState: StockDataState = {
    stockData: {}
};

const stockReducer = (state = initialState, action: any): StockDataState => {
    switch (action.type) {
        case SET_STOCK_DATA:
            return {
                ...state,
                stockData: action.payload
            };
        default:
            return state;
    }
};


interface StockImage {
    stock_id: string;
    stock_image: string;
    timeStamp: string;
}

interface StockImageState {
    stockImage: StockImage[];
    selectedStock: string | null;
}

const initialStat: StockImageState = {
    stockImage: [],
    selectedStock: null,
};

const stockImageReducer = (state = initialStat, action: any): StockImageState => {
    switch (action.type) {
        case SET_STOCK_IMAGE:
            return {
                ...state,
                stockImage: action.payload
            };
        case SET_SELECTED_STOCK:
                return {
                    ...state,
                    selectedStock: action.payload
                };
        default:
            return state;
    }
};




const rootReducer = combineReducers({
    stockData: stockReducer,
    stockImage: stockImageReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;