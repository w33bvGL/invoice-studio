export default defineAppConfig({
    invoice: {
        currencies: [
            // --- Major Fiat Currencies ---
            'AUD', // Australian Dollar
            'CAD', // Canadian Dollar
            'CHF', // Swiss Franc
            'EUR', // Euro
            'GBP', // British Pound Sterling
            'HKD', // Hong Kong Dollar
            'JPY', // Japanese Yen
            'SGD', // Singapore Dollar
            'USD', // United States Dollar

            // --- Regional & CIS Currencies ---
            'AED', // UAE Dirham
            'AMD', // Armenian Dram
            'AZN', // Azerbaijani Manat
            'BYN', // Belarusian Ruble
            'GEL', // Georgian Lari
            'KZT', // Kazakhstani Tenge
            'RUB', // Russian Ruble
            'UAH', // Ukrainian Hryvnia

            // --- Crypto: Stablecoins ---
            'BUSD', // Binance USD
            'DAI',  // Multi-Collateral DAI
            'FDUSD',// First Digital USD
            'PYUSD',// PayPal USD
            'USDC', // USD Coin
            'USDT', // Tether
            'USDE', // Ethena USDe

            // --- Crypto: Native Tokens ---
            'BNB',  // BNB
            'BTC',  // Bitcoin
            'ETH',  // Ethereum
            'SOL',  // Solana
            'TON',  // Toncoin
            'XRP'   // Ripple
        ]
    }
})