# Currency

A simple currency conversion tool.  
## Features  
Converts an amount of money from one currency to another:  
* Handles float numbers up to a 19 digits precision.  
* Automatically updated exchange rates.  
* 34 currencies (including Bitcoin).  

## Usage  
* **3 parameters:**    
    * amount: The amount of money to be converted (can be float or int).  
    * from: The currency you wish to convert.  
    * to: The currency you wish to convert to.
* **The command:**  
When launching cli.js, add the 3 parameters in order:  
Here is an example:
```sh
❯ node cli.js 5.5 usd eur
```  

    5.5 US dollars converted to euros  
    **WARNING:** Currency names must follow the ISO 4217 norm.  
    Here is a table of all available currency for this application:  

    | Currency | ISO 4217 code |
    |----------|------------------|
    | Bitcoin | BTC |
    | Euro | EUR |
    | US dollar | USD |
    | Canadian dollar | CAD |
    | Hong Kong dollar | HKD |
    | Icelandic króna | ISK |
    | Philippine peso | PHP |
    | Danish krone | DKK |
    | Hungarian forint | HUF |
    | Czech koruna | CZK |
    |  Australian dollar | AUD |
    | Romanian leu | RON |
    | Swedish krona/kronor | SEK |
    |  	Indonesian rupiah | IDR |
    |  	Indian rupee | INR |
    | Brazilian real | BRL |
    | Russian ruble | RUB |
    | Croatian kuna | HRK |
    | Japanese yen | JPY |
    | Thai baht | THB |
    | Swiss franc | CHF |
    | Singapore dollar | SGD |
    | Polish złoty | PLN |
    | Bulgarian lev | BGN |
    | Turkish lira | TRY |
    | Renminbi (Chinese) yuan | CNY |
    | Norwegian krone | NOK |
    |  	New Zealand dollar | NZD |
    | South African rand | ZAR |
    | Mexican peso | MXN |
    | Israeli new shekel | ILS |
    | Pound sterling | GBP |
    | South Korean won | KRW |
    | Malaysian ringgit | MYR |

*Note : BTC is not an official ISO 4217 notation*
