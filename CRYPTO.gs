
/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CRYPTO')
      .addItem('Refresh prices', 'cryptoRefresh')
      .addItem('Fetch API data', 'cryptoFetchData')
      .addSeparator()
      .addItem('Configure exchange', 'showSelectExchange')
      .addSeparator()
      .addItem('How to auto-refresh rates', 'ShowRefreshInfo')
      .addToUi();
}

/**
 * @OnlyCurrentDoc
 */
function ShowRefreshInfo() {
  var ui = SpreadsheetApp.getUi()
  ui.alert(
    "How to refresh rates",
    'Coming soon...',
    ui.ButtonSet.OK
  )
}

/**
 * @OnlyCurrentDoc
 */
function showSelectExchange() {
  var ui = SpreadsheetApp.getUi();
  var userProperties = PropertiesService.getUserProperties();
  var userExchange = userProperties.getProperty("CRYPTO_EXCHANGE")

  var result = ui.prompt(
    'Exchange setting',
    `Set the exchange you want to use for prices (e.g "binance", "kraken", ...)\nIt is currently set to "${userExchange}"`,
    ui.ButtonSet.OK_CANCEL
  );
  
  var button = result.getSelectedButton();
  var user_input = result.getResponseText().replace(/\s+/g, '');
  if (button == ui.Button.OK) {
    if (user_input) {
      userProperties.setProperty("CRYPTO_EXCHANGE", user_input);
      ui.alert(
        'Exchange successfully saved',
        'If it does not work riht away, please try to refresh manually.',
        ui.ButtonSet.OK
      );
    }
  }
}


/*
  refresh()
  TRIGGER
    Borrowed form:
    https://tanaikech.github.io/2019/10/28/automatic-recalculation-of-custom-function-on-spreadsheet-part-2/
*/
function cryptoRefresh() {
  const customFunctions = ["CRYPTO_PRICE"]; // Please set the function names here.

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var temp = Utilities.getUuid();
  var loadingStr = 'Refreshing coin...';

  customFunctions.forEach(function(funcName) {
    ss.createTextFinder("=" + funcName)
      .matchFormulaText(true)
      .replaceAllWith(loadingStr);
    ss.createTextFinder(loadingStr)
      .matchFormulaText(true)
      .replaceAllWith("=" + funcName);
  });
}

function cryptoDeleteData() {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteProperty('COIN_DATA');
  scriptProperties.deleteProperty('CRYPTO_COIN_DATA');
}

/*
  fetchAPIData()
  TRIGGER
*/
function cryptoFetchData() {
  var userProperties = PropertiesService.getUserProperties();
  var exchange = userProperties.getProperty("CRYPTO_EXCHANGE") || "binance";
  var url=`https://api.coinstats.app/public/v1/coins?skip=0&limit=1000&exchange=${exchange}&currency=USDT`;
  var response = UrlFetchApp.fetch(url); // get feed
  var jsonData = JSON.parse(response.getContentText());

  // To make the retrieving easier, key them by their ticker
  const data = {};
  Object.values(jsonData.coins).forEach((coin) => {
    data[coin.symbol] = {
      price: coin.price,
      priceBtc: coin.priceBtc,
    };
  });

  console.log('cryptoFetchData().CRYPTO_EXCHANGE', exchange);
  console.log('cryptoFetchData().CRYPTO_COIN_DATA', data);
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('CRYPTO_COIN_DATA', JSON.stringify(data));
}

/**
 * Get a ticker price from a Range of tickers.
 * @param {ticker(s)} range.
 * @param {currency} only USDT and BTC are supported for now.
 * @return The value of the ticker for the given currency.
 * @customfunction
 */
function CRYPTO_PRICE(input = "BTC", currency = "USDT") {
   
  if (input.map) {
    return input.map((ticker) => CRYPTO_PRICE(ticker, currency));
  }
  else {
    var scriptProperties = PropertiesService.getScriptProperties();
    const coinDataJSON = scriptProperties.getProperty('CRYPTO_COIN_DATA');
    let coinData = JSON.parse(coinDataJSON);

    // DEBUG mode
    if (!coinData) coinData = {"BTC": {"price": "1337", priceBtc: "1"}};
    
    console.log('currency', currency);
    if (!["USDT", "BTC"].includes(currency)) throw new Error("The currency param must be USDT or BTC, Default to USDT.");

    const priceProperty = currency === "USDT" ? "price" : "priceBtc";

    const price = coinData[input] && coinData[input][priceProperty] ? coinData[input][priceProperty] : 'n/a';

    return price;
  }
}
