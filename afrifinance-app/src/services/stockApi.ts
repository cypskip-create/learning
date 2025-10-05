import { Stock } from '../types';

const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY'; // Get free key from alphavantage.co
const BASE_URL = 'https://www.alphavantage.co/query';

// For demo purposes, we'll create a service that can be easily swapped with real API
class StockApiService {
  // Fetch real-time quote
  async getQuote(symbol: string): Promise<Stock | null> {
    try {
      const response = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      
      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol: symbol,
          name: this.getCompanyName(symbol),
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return null;
    }
  }

  // Fetch historical data
  async getHistoricalData(symbol: string, days: number = 30) {
    try {
      const response = await fetch(
        `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      
      if (data['Time Series (Daily)']) {
        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).slice(0, days);
        
        return dates.map(date => ({
          date: date,
          price: parseFloat(timeSeries[date]['4. close'])
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }

  // Get multiple quotes at once
  async getMultipleQuotes(symbols: string[]): Promise<Stock[]> {
    const promises = symbols.map(symbol => this.getQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(stock => stock !== null) as Stock[];
  }

  // Helper function to map symbols to company names
  private getCompanyName(symbol: string): string {
    const nameMap: { [key: string]: string } = {
      'SAFCOM': 'Safaricom PLC',
      'EQTY': 'Equity Group',
      'KCB': 'KCB Group',
      'COOP': 'Co-operative Bank',
      'ABSA': 'Absa Bank Kenya',
      'BAMB': 'Bamburi Cement',
      'SCBK': 'Standard Chartered'
    };
    return nameMap[symbol] || symbol;
  }

  // Search for stocks
  async searchStocks(query: string) {
    try {
      const response = await fetch(
        `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();
      return data.bestMatches || [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }
}

export const stockApi = new StockApiService();