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
  await currency(1,"usd","eur")
});

test('convert 1 USD to USD', async () => {
    await currency(1,"usd","usd")
});

test('convert 1 EUR to USD', async () => {
    await currency(1,"eur","usd")
});

test('convert 1 BTC to USD', async () => {
    await currency(1,"btc","usd")
});

test('convert 1 BTC to EUR', async () => {
    await currency(1,"btc","eur")
});

test('convert without arguments', async () => {
    await currency
});

test('convert with amount only', async () => {
    await currency(15)
});

test('convert with amount and (from) currency only', async () => {
    await currency(15,"usd")
});

test('convert without a correct `from` or `to` currency value', async () => {
    await currency(1,"yes","no")
});
