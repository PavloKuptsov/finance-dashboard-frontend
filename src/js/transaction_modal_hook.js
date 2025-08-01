import { useState } from 'react';
import { fetchTransactions } from './transactions_service.js';

export function useTransactionModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('Transactions');

    const handleCellClick = async (event) => {
        const target = event.target.closest('[data-query]');
        if (!target) return;

        const queryString = target.getAttribute('data-query');
        if (!queryString) return;

        await fetchAndShowTransactions(queryString, target.textContent.trim());
    };

    const handleChartClick = async (queryString, title) => {
        await fetchAndShowTransactions(queryString, title);
    };

    const fetchAndShowTransactions = async (queryString, title) => {
        try {
            setIsLoading(true);
            
            // Parse query parameters from query string
            const queryParams = new URLSearchParams(queryString);
            const params = Object.fromEntries(queryParams.entries());
            
            // Fetch transactions
            const transactionData = await fetchTransactions(params);
            
            // Update modal state
            setTransactions(transactionData);
            setModalTitle(`Transactions - ${title}`);
            setIsModalOpen(true);
            
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            setTransactions([]);
            setModalTitle('Error Loading Transactions');
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTransactions([]);
    };

    return {
        isModalOpen,
        transactions,
        isLoading,
        modalTitle,
        handleCellClick,
        handleChartClick,
        handleCloseModal,
        openModal: () => setIsModalOpen(true)
    };
}