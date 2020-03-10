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
    var amount = 1
    var from = 'USD'
    var to = 'EUR'
    const opts = {amount, from, to}
  result = await currency(opts)
  console.log("convert 1 USD to EUR")
  console.log(`${amount} ${from} = ${result} ${to}`)
});

test('convert 1 USD to USD', async () => {
    var amount = 1
    var from = 'USD'
    var to = 'USD'
    const opts = {amount, from, to}
    result = await currency(opts)
    console.log("convert 1 USD to USD")
    console.log(`${amount} ${from} = ${result} ${to}`)
});

test('convert 1 EUR to USD', async () => {
    var amount = 1
    var from = 'EUR'
    var to = 'USD'
    const opts = {amount, from, to}
    result = await currency(opts)
    console.log("convert 1 EUR to USD")
    console.log(`${amount} ${from} = ${result} ${to}`)
});

test('convert 1 BTC to USD', async () => {
    var amount = 1
    var from = 'BTC'
    var to = 'USD'
    const opts = {amount, from, to}
    result = await currency(opts)
    console.log("convert 1 BTC to USD")
    console.log(`${amount} ${from} = ${result} ${to}`)
});

test('convert 1 BTC to EUR', async () => {
    var amount = 1
    var from = 'BTC'
    var to = 'EUR'
    const opts = {amount, from, to}
    result = await currency(opts)
    console.log("convert 1 BTC to EUR")
    console.log(`${amount} ${from} = ${result} ${to}`)
});

test('convert without arguments', async () => {
    result = await currency({})
    console.log("No arguments")
    console.log(`result = ${result}`)
});

test('convert with amount only', async () => {
    var amount = 1
    result = await currency({amount})
    console.log("convert amount only")
    console.log(`${amount} = ${result}`)
});

test('convert with amount and (from) currency only', async () => {
    var amount = 1
    var from = 'USD'
    const opts = {amount, from}
    result = await currency(opts)
    console.log("amount and from only")
    console.log(`${amount} ${from} = ${result} `)
});

test('convert without a correct `from` or `to` currency value', async () => {
    var amount = 1
    var from = 'yes'
    var to = 'yes'
    const opts = {amount, from, to}
    result = await currency(opts)
    console.log("convert 1 USD to USD")
    console.log(`${amount} ${from} = ${result} ${to}`)
});
