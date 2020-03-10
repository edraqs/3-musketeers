const nock = require('nock');

beforeEach(() => {
  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=USD')
    .reply(200, {
      'base': 'USD',
      'rates': {
        'EUR': 0.899
      }
    });

  nock('https://api.exchangeratesapi.io')
    .get('/latest?base=EUR')
    .reply(200, {
      'base': 'EUR',
      'rates': {
        'USD': 1.1122
      }
    });

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      'USD': {
        '15m': 8944.49,
        'last': 8944.49,
        'buy': 8944.49,
        'sell': 8944.49,
        'symbol': '$'
      },
      'EUR': {
        '15m': 8048.11,
        'last': 8048.11,
        'buy': 8048.11,
        'sell': 8048.11,
        'symbol': '€'
      }
    });
});
const currency = require('./');

test('convert 1 USD to EUR', async () => {
  result = await currency(1,"usd","eur")
  console.log("convert 1 USD to EUR")
  console.log(`${1} ${"usd"} = ${result} ${"eur"}`)
});

test('convert 1 USD to USD', async () => {
    result = await currency(1,"usd","usd")
    console.log("convert 1 USD to USD")
    console.log(`${1} ${"usd"} = ${result} ${"usd"}`)
});

test('convert 1 EUR to USD', async () => {
    result = await currency(1,"eur","usd")
    console.log("convert 1 EUR to USD")
    console.log(`${1} ${"eur"} = ${result} ${"usd"}`)
});

test('convert 1 BTC to USD', async () => {
    result = await currency(1,"btc","usd")
    console.log("convert 1 BTC to USD")
    console.log(`${1} ${"btc"} = ${result} ${"usd"}`)
});

test('convert 1 BTC to EUR', async () => {
    result = await currency(1,"btc","eur")
    console.log("convert 1 USD to EUR")
    console.log(`${1} ${"usd"} = ${result} ${"eur"}`)
});

/*test('convert without arguments', async () => {
    result = await currency
    console.log("No arguments")
    console.log(`result = ${result}`)
});*/

test('convert with amount only', async () => {
    result = await currency(15)
    console.log("convert 1 USD to USD")
    console.log(`${15} ${"none"} = ${result} ${"none"}`)
});

test('convert with amount and (from) currency only', async () => {
    result = await currency(15,"usd")
    console.log("convert 1 USD to USD")
    console.log(`${15} ${"usd"} = ${result}`)
});

test('convert without a correct `from` or `to` currency value', async () => {
    result = await currency(1,"yes","no")
    console.log("convert 1 USD to USD")
    console.log(`${1} ${"yes"} = ${result} ${"no"}`)
});
