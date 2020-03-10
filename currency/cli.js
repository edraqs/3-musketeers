#!/usr/bin/env node

const currency = require('./');
const ora = require('ora');

const argv = process.argv.slice(2);

function help () {
  console.log(
    [
      '',
      '  Example',
      '    ❯ currency 1650 dkk eur',
      '    1650 DKK = 220.79486154 EUR',
      '',
      '  See README.md for detailed usage.'
    ].join('\n')
  );
}

const spinner = ora('Fetching exchange data..');

/**
 * The main function,
 * displays the converted amount of money from one to another currency
 * @param  {amount: float, from: String, to: String} opts from and to are the two currencies names
 * NAMES MUST BE WRITTEN FOLLOWING THE ISO 4217 NORM.
 * The list of available currencies can be found in the README.md file.
 * @return {void}    Displays the result in the console.
 */
async function start (opts) {
  try {
    const {amount, from, to} = opts;
    const result = await currency(opts);

    spinner.stop();
    console.log(`${amount} ${from} = ${result} ${to}`);
  } catch (error) {
    spinner.stop();
    console.log(error);
    process.exit(1);
  }

}

if (argv.indexOf('--help') !== - 1) {
  help();
  process.exit(0);
}

spinner.start();

//By default the program converts 1 USD to BTC
const opts = {
  'amount': argv[0] || 1,
  'from': (argv[1] || 'USD').toUpperCase(),
  'to': (argv[2] || 'BTC').toUpperCase()
};

start(opts);
