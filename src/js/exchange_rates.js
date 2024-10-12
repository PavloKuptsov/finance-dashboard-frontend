export default function ExchangeRates({exchangeRates}) {
    return (
        <div className="logo exchange-rate text-center">
            <b>USD</b>: <span>{exchangeRates ? exchangeRates.USD.UAH : ''}</span><br/>
            <b>EUR</b>: <span>{exchangeRates ? exchangeRates.EUR.UAH : ''}</span>
        </div>
    )
}