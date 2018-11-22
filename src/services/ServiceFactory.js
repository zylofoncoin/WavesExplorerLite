import {MoneyService} from './MoneyService';
import {CurrencyService} from './CurrencyService';
import {TransactionTransformerService} from './TransactionTransformerService';
import {SearchService} from './SearchService';

class ServiceFactory {
    constructor() {
        this.cache = {};
    }

    currencyService = (networkId) => {
        const instance = this.cache[networkId];
        if (instance) {
            return instance;
        }

        const newOne = new CurrencyService(networkId);
        this.cache[networkId] = newOne;

        return newOne;
    };

    moneyService = (networkId) => new MoneyService(this.currencyService(networkId));

    transactionTransformerService = (networkId) => new TransactionTransformerService(this.currencyService(networkId));

    searchService = (networkId) => new SearchService(networkId);
}

const factoryInstance = new ServiceFactory();

export default factoryInstance;
