const BASE_URL = 'https://stocksapi-uhe1.onrender.com/api/stocks';

export async function fetchChartData(stockSymbol, range) {
    try {
        const response = await fetch(`${BASE_URL}/getstocksdata?symbol=${stockSymbol}&range=${range}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        throw error;
    }
}

export async function fetchStockProfile(stockSymbol) {
    try {
        const response = await fetch(`${BASE_URL}/getstocksprofiledata?symbol=${stockSymbol}`);
        const profile = await response.json();
        return profile;
    } catch (error) {
        console.error('Error fetching stock profile:', error);
        throw error;
    }
}

export async function fetchStockSummary(stockSymbol) {
    try {
        const response = await fetch(`${BASE_URL}/getstockstatsdata?symbol=${stockSymbol}`);
        const summary = await response.json();
        return summary;
    } catch (error) {
        console.error('Error fetching stock summary:', error);
        throw error;
    }
}
