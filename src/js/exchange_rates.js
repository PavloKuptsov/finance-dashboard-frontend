export default function ExchangeRates({exchangeRates}) {
    return (
        <div className="col-lg-6 col-md-12 exchange-rate text-center">
            <b>USD</b>: <span>{exchangeRates ? exchangeRates.USD.UAH : ''}</span>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <b>EUR</b>: <span>{exchangeRates ? exchangeRates.EUR.UAH : ''}</span>
        </div>
    )
}