const axios = require('axios');
const money = require('money');

//Importing the current conversion rates of various currencies to euro and bitcoin.
const RATES_URL = 'https://api.exchangeratesapi.io/latest';
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';


/**
 * Testing if one of the currencies is BTC (returns a bool)
 * @param  {String}  from
 * @param  {String}  to
 * @return {Boolean}      true if either parameter is 'BTC'
 */
const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);

/**
 * Throws arguments into converter.
 * @param  {amount: int, from: String, to: String}  opts amount of currency, currency to be converted, currency to convert to
 * @return {function}  returns money.convert()
 */
module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from;
    //browsing the BTC rate page:
    promises.push(axios(BLOCKCHAIN_URL));
  }

//Creating the URL for a desired currency
//URL ultimately looks like : https://api.exchangeratesapi.io/latest?base=<BaseCurrency>
  promises.unshift(axios(`${RATES_URL}?base=${base}`));


  try {
    const responses = await Promise.all(promises);
    const [rates] = responses;

    money.base = rates.data.base;
    money.rates = rates.data.rates;

    const conversionOpts = {
      from,
      to
    };

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    /**
     * Converts an amount of currency from one to another
     *  @param  {amount: int, conversionOpts:{from: String, to: String} }  opts amount of currency, {currency to be converted, currency to convert to}
     *  @return {converted_amount: int}  Converted amount of money.
     */
    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
