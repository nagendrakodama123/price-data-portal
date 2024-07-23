import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockData, setSelectedStock } from './redux/action.ts';
import { RootState } from './redux/reducer';

const StockDataTable: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.stockData.stockData);
    const imageData = useSelector((state: RootState) => state.stockImage.stockImage)
    const selectedStock = useSelector((state: RootState) => state.stockImage.selectedStock)

    useEffect(() => {
        dispatch(fetchStockData());
    }, [dispatch]);


    return (
    <div className="stock-table-container">
        <div className='table_header'>

            {imageData.map(image => (
                <div className='stock_image' key={image.stock_id} onClick={() => { dispatch(setSelectedStock(image.stock_id)) }}>
                    <img src={image.stock_image} alt={image.stock_id} style={{ width: '25px', height: '25px' }} />
                    <p>{image.stock_id}</p>
                </div>))}
            <div className='stock_image' onClick={() => { dispatch(setSelectedStock(null)) }}> show all</div></div>

        {data && Object.keys(data).length === 0 ? (
            <p>Loading data...</p>
        ) :
            (Object.keys(data).map(stockKey => {
                if (selectedStock === stockKey || selectedStock === null) {
                    return <div key={stockKey} className="stock-section">
                        <h2>{stockKey}</h2>
                        <table className="stock-table">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(data[stockKey]) && data[stockKey].map(stock => (
                                    <tr key={stock._id}>
                                        <td>{stock.current_price}</td>
                                        <td>{new Date(stock.timeStamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            }
            ))
        }

    </div>
    );
}

export default StockDataTable;