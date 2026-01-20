/**
 * Defense Stocks API - Fetch top defense stocks from Finnhub
 */

import { logger, FINNHUB_API_KEY, FINNHUB_BASE_URL } from '$lib/config/api';

export interface DefenseStock {
	symbol: string;
	name: string;
	description: string;
	price: number;
	change: number;
	changePercent: number;
	logoUrl: string;
}

interface FinnhubQuote {
	c: number; // Current price
	d: number; // Change
	dp: number; // Percent change
	h: number; // High price of the day
	l: number; // Low price of the day
	o: number; // Open price of the day
	pc: number; // Previous close price
	t: number; // Timestamp
}

/**
 * Check if Finnhub API key is configured
 */
function hasFinnhubApiKey(): boolean {
	return Boolean(FINNHUB_API_KEY && FINNHUB_API_KEY.length > 0);
}

/**
 * Fetch a quote from Finnhub
 */
async function fetchFinnhubQuote(symbol: string): Promise<FinnhubQuote | null> {
	try {
		const url = `${FINNHUB_BASE_URL}/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data: FinnhubQuote = await response.json();

		// Finnhub returns all zeros when symbol not found
		if (data.c === 0 && data.pc === 0) {
			return null;
		}

		return data;
	} catch (error) {
		logger.error('Defense API', `Error fetching quote for ${symbol}:`, error);
		return null;
	}
}

/**
 * Generate logo URL for defense stock
 */
function getDefenseLogoUrl(symbol: string): string {
	const domainMap: Record<string, string> = {
		LMT: 'lockheedmartin.com',
		RTX: 'rtx.com',
		NOC: 'northropgrumman.com',
		BA: 'boeing.com',
		GD: 'gd.com',
		LHX: 'l3harris.com',
		HII: 'huntingtoningalls.com',
		TXT: 'textron.com',
		LDOS: 'leidos.com',
		KTOS: 'kratosdefense.com'
	};

	const domain = domainMap[symbol];
	if (domain) {
		return `https://logo.clearbit.com/${domain}`;
	}

	// Fallback to generic placeholder
	const firstLetter = symbol.charAt(0);
	return `https://ui-avatars.com/api/?name=${firstLetter}&size=60&background=random`;
}

/**
 * Defense stock configurations
 */
const DEFENSE_STOCKS = [
	{
		symbol: 'LMT',
		name: 'Lockheed Martin',
		description: 'Aerospace & defense - F-35, missiles, space systems'
	},
	{
		symbol: 'RTX',
		name: 'RTX Corporation',
		description: 'Aerospace & defense - Missiles, aircraft engines, cybersecurity'
	},
	{
		symbol: 'NOC',
		name: 'Northrop Grumman',
		description: 'Aerospace & defense - B-2 bomber, Global Hawk, cyber solutions'
	},
	{ symbol: 'BA', name: 'Boeing', description: 'Aerospace - Commercial & military aircraft' },
	{
		symbol: 'GD',
		name: 'General Dynamics',
		description: 'Defense - Combat vehicles, submarines, business jets'
	},
	{
		symbol: 'LHX',
		name: 'L3Harris Technologies',
		description: 'Defense technology - Communications, electronic systems'
	},
	{
		symbol: 'HII',
		name: 'Huntington Ingalls',
		description: 'Shipbuilding - Aircraft carriers, submarines'
	},
	{
		symbol: 'TXT',
		name: 'Textron',
		description: 'Aviation & defense - Bell helicopters, Cessna aircraft'
	},
	{
		symbol: 'LDOS',
		name: 'Leidos Holdings',
		description: 'Defense services - IT, engineering, scientific solutions'
	},
	{
		symbol: 'KTOS',
		name: 'Kratos Defense',
		description: 'Defense technology - Drones, satellite communications'
	}
];

/**
 * Create an empty defense stock item
 */
function createEmptyDefenseStock(
	symbol: string,
	name: string,
	description: string
): DefenseStock {
	return {
		symbol,
		name,
		description,
		price: NaN,
		change: NaN,
		changePercent: NaN,
		logoUrl: getDefenseLogoUrl(symbol)
	};
}

/**
 * Fetch defense stocks data
 */
export async function fetchDefenseStocks(): Promise<DefenseStock[]> {
	const createEmptyStocks = () =>
		DEFENSE_STOCKS.map((stock) =>
			createEmptyDefenseStock(stock.symbol, stock.name, stock.description)
		);

	if (!hasFinnhubApiKey()) {
		logger.warn('Defense API', 'Finnhub API key not configured');
		return createEmptyStocks();
	}

	try {
		logger.log('Defense API', 'Fetching defense stocks from Finnhub');

		const quotes = await Promise.all(
			DEFENSE_STOCKS.map(async (stock) => {
				const quote = await fetchFinnhubQuote(stock.symbol);
				return { stock, quote };
			})
		);

		return quotes.map(({ stock, quote }) => ({
			symbol: stock.symbol,
			name: stock.name,
			description: stock.description,
			price: quote?.c ?? NaN,
			change: quote?.d ?? NaN,
			changePercent: quote?.dp ?? NaN,
			logoUrl: getDefenseLogoUrl(stock.symbol)
		}));
	} catch (error) {
		logger.error('Defense API', 'Error fetching defense stocks:', error);
		return createEmptyStocks();
	}
}
