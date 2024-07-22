import axios from 'axios';
import { Dispatch } from 'redux';

export const SET_STOCK_DATA = 'SET_STOCK_DATA';
export const SET_STOCK_IMAGE = 'SET_STOCK_IMAGE';
export const SET_SELECTED_STOCK = 'SET_SELECTED_STOCK';

interface SetStockDataAction {
    type: typeof SET_STOCK_DATA;
    payload: any; // Adjust this type to match your data structure
}

export type StockActionTypes = SetStockDataAction;

export const setStockData = (data: any): SetStockDataAction => ({
    type: SET_STOCK_DATA,
    payload: data
});

export const setSelectedStock = (data: any): any => ({
    type: SET_SELECTED_STOCK,
    payload: data
});

interface SetStockImagesAction {
    type: typeof SET_STOCK_IMAGE;
    payload: any; // Adjust this type to match your data structure
}

export type StockImageActionTypes = SetStockImagesAction;

export const setStockImages = (data: any): SetStockImagesAction => ({
    type: SET_STOCK_IMAGE,
    payload: data
});


export const fetchStockData = () => async (dispatch: Dispatch<any>) => {
    try {
        const response = await axios.get('http://localhost:3505/priceData/stock/data');
        dispatch(setStockData(response.data.data.priceData[0] || {}));
        dispatch(setStockImages(response.data.data.images || {}))
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};