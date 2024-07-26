import { fetchChartData } from './api.js';

const chartElement = document.getElementById('stockChart');
const stockChart = new Chart(chartElement, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Price',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Price: $${context.raw.toFixed(2)}`;
                    }
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price'
                },
                beginAtZero: false
            }
        }
    }
});

export async function updateChart(stockSymbol, range) {
    try {
        const response = await fetchChartData(stockSymbol, range);


        console.log('API Response:', response);

        const data = Array.isArray(response.data) ? response.data : response;

        if (!Array.isArray(data)) {
            throw new Error('Expected data to be an array');
        }

        const labels = data.map(entry => new Date(entry.timestamp * 1000).toLocaleDateString());
        const prices = data.map(entry => entry.price);


        stockChart.data.labels = labels;
        stockChart.data.datasets[0].data = prices;
        stockChart.update();

        document.getElementById('peak-value').textContent = `Peak Value: $${Math.max(...prices).toFixed(2)}`;
        document.getElementById('low-value').textContent = `Low Value: $${Math.min(...prices).toFixed(2)}`;
    } catch (error) {
        console.error('Error updating chart:', error);
        document.getElementById('chart-summary').innerHTML = '<p>Error loading chart data. Please try again later.</p>';
    }
}

document.querySelectorAll('#chart-controls button').forEach(button => {
    button.addEventListener('click', () => {
        const range = button.getAttribute('data-range');
        const selectedStock = document.querySelector('#stock-list .selected');
        if (selectedStock) {
            updateChart(selectedStock.textContent, range);
        }
    });
});
const defaultStock = 'AAPL';
updateChart(defaultStock, '1m');
