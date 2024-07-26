import { fetchStockProfile, fetchStockSummary } from './api.js';

export async function updateStockDetails(stockSymbol) {
    try {
        const profile = await fetchStockProfile(stockSymbol);
        const summary = await fetchStockSummary(stockSymbol);

        const detailsElement = document.getElementById('details');
        detailsElement.innerHTML = '';

        const nameElement = document.createElement('p');
        nameElement.textContent = `Name: ${profile.name}`;
        
        const bookValueElement = document.createElement('p');
        bookValueElement.textContent = `Book Value: $${profile.bookValue.toFixed(2)}`;

        const profitElement = document.createElement('p');
        profitElement.textContent = `Profit: $${profile.profit.toFixed(2)}`;
        profitElement.className = profile.profit > 0 ? 'profit-positive' : 'profit-negative';

        const summaryElement = document.createElement('p');
        summaryElement.textContent = `Summary: ${summary.summary}`;

        detailsElement.appendChild(nameElement);
        detailsElement.appendChild(bookValueElement);
        detailsElement.appendChild(profitElement);
        detailsElement.appendChild(summaryElement);
    } catch (error) {
        console.error('Error updating stock details:', error);
        document.getElementById('details').innerHTML = '<p>Error loading stock details. Please try again later.</p>';
    }
}
