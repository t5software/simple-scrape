// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('check quick price', async ({ page }) => {
  await page.goto('https://coinmarketcap.com/currencies/quickswap/');
  
  let result = {};
  
  result.time = Date.now();
  console.log("time - " + result.time);
  
  let tempPrice = await page.locator('.priceValue > span').innerText();
  console.log("price - " + tempPrice);
  result.price = Number(tempPrice.substring(1));
  console.log(result.price);
  
  result.symbol = await page.locator('small.nameSymbol').innerText();
  console.log("symbol - " + result.symbol);
  
  const filename = `${result.symbol}-${result.time}-${result.price}.txt`;
  
  fs.writeFile(filename, JSON.stringify(result), err => {
    if(err) {
      console.error(err);
    }
  });
});