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


    return (<div className="stock-table-container">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    border: "1px dotted gray",
    borderRadius: "50%"}} onClick={() => { dispatch(setSelectedStock(null)) }}> show all</div>
            {imageData.map(image => (
            <div style={{padding: '5px'}} key={image.stock_id} onClick={() => { dispatch(setSelectedStock(image.stock_id)) }}>
                <img src={image.stock_image} alt={image.stock_id} style={{ width: '50px', height: '50px' }} />
            </div>))}</div>
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
                                    <th>Current Price</th>
                                    <th>TimeStamp</th>
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
    return (
        <div className="stock-table-container">
            {/* {imageData.map(image => (
                <div key={image.stock_id}>

                    <div>
                        <img src={image.stock_image} alt={image.stock_id} style={{ width: '50px', height: '50px' }} />
                    </div>
                </div>))} */}
            {data && Object.keys(data).length === 0 ? (
                <p>Loading data...</p>
            ) : (
                Object.keys(data).map(stockKey => (
                    <div key={stockKey} className="stock-section">
                        <h2>{stockKey}</h2>
                        <table className="stock-table">
                            <thead>
                                <tr>
                                    <th>Current Price</th>
                                    <th>TimeStamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {Array.isArray(data[stockKey]) && data[stockKey].map(stock => (
                                    <tr key={stock._id}>
                                        <td>{stock.current_price}</td>
                                        <td>{new Date(stock.timeStamp).toLocaleString()}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}

export default StockDataTable;