import { updateChart } from './chart.js';
import { updateStockDetails } from './details.js';

const stockListElement = document.getElementById('stock-list');
const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];

function createStockList() {
    stockListElement.innerHTML = '';
    stocks.forEach(stock => {
        const li = document.createElement('li');
        li.textContent = stock;
        li.addEventListener('click', () => {
            document.querySelectorAll('#stock-list li').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');
            updateChart(stock, '1m');
            updateStockDetails(stock);
        });
        stockListElement.appendChild(li);
    });
}

createStockList();
