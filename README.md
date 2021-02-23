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

Note: These two steps are required whenever you want to have the latest prices displayed.

## Refresh prices automatically
_Coming soon..._

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
