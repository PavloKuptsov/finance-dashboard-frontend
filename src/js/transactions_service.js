import { apiUrl, requestInit } from './utils';

export async function fetchTransactions(queryParams) {
    try {
        const url = new URL(`${apiUrl}/transactions`);
        
        // Add query parameters to the URL
        Object.keys(queryParams).forEach(key => {
            if (queryParams[key] !== null && queryParams[key] !== undefined) {
                url.searchParams.append(key, queryParams[key]);
            }
        });

        const response = await fetch(url.toString(), requestInit);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
}
