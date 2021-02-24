# CRYPTO Sheets
👋

## Installation
1. Open a Google sheet where you wish to use these scripts.
2. Go to **Tools** &rsaquo; **Script editor**
3. Copy the content of [`CRYPTO.gs`](https://raw.githubusercontent.com/kbouchard/crypto-sheets/main/CRYPTO.gs) and paste it in the script editor (replace any existing content).
4. Save the script with **File** &rsaquo; **Save**, name it **CRYPTO**, then close the script editor.
5. Back to your Google sheet, refresh the page, a **CRYPTO** menu will appear next to **Help**
6. That's it! You now have the `CRYPTO_PRICE()` function available in your sheet.

## Post-installation steps
On your first installation, you won't have the price data right away, so you need to fetch it.
1. Go to **CRYPTO** &rsaquo; **Fetch API data**.
2. Wait for the script to finish running.
3. Go to **CRYPTO** &rsaquo; **Refresh prices**.

Note: These two steps are required whenever you want to have the latest prices displayed (if you did not enable auto-refresh).

## Usage
Display prices of a single cell:
```
=CRYPTO_PRICE(A1)
```
Display prices of a range (recommended):
```
=CRYPTO_PRICE(A1:A10)
```
Display prices of a range for the BTC pair:
```
=CRYPTO_PRICE(A1:A10, "BTC")
```

## Refresh prices automatically
In order to refresh prices automatically, two things needs to happen. First, the data needs to be fetched from the API. Second, you need a "hack" to refresh the `=CRYPTO_PRICE` functions.

1. Go to **Tools** &rsaquo; **Script editor**.
2. Go the the **Triggers** tab.

### Create the Fetch API data trigger
Create a new trigger that fetch the API data every 5 minutes (could be 10 too, note: I don't recommend every 1 minutes, itit might affect performance).

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-trigger-fetch.png" width="372" />

### Create the Refresh trigger
Create a new trigger that refresh the data every minutes.

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-trigger-refresh.png" width="370" />

You should now have your two triggers:

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-triggers.png" width="626" />

**⚠️ When using auto-refresh, there is currently an issue affecting the =CRYPTO_PRICE() when you switch tab and come back to the sheet, they stay in "loading..." state. You can fix it by refreshing prices manually through the CRYPTO menu. If this problem is too annoying, you can either remove the triggers and refresh manually through the CRYPTO menu or change the triggers to be every 5minutes each, it might be more stable.**


# Screenshots
<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-menu.png" width="125" /> 

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-demo-hor-usdt.png" width="736" />

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-demo-hor-btc.png" width="733" />

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-demo-ver-usdt.png" width="366" />

<img src="https://github.com/kbouchard/crypto-sheets/blob/main/screenshots/ss-demo-ver-btc.png" width="382" />
