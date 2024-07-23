import './App.css';
import { Provider } from 'react-redux';
import store from './components/redux/store.ts';
import StockDataTable from './components/StockDataTable.tsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className='header'>
          <h1>Real-Price-Data</h1>
        </div>
        <StockDataTable />
      </div>
    </Provider>
  );
}

export default App;
