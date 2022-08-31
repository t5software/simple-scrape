// @ts-check
const { test, expect } = require('@playwright/test');

test('check most stars from forks', async ({ page }) => {
  await page.goto('https://github.com/NomicFoundation/hardhat-boilerplate/network/members');
  
  const selector = '.repo > a:last-child';
  let result = {};
  result.max = '0';
  
  result.startTime = Date.now();
  console.log('startTime - ' + result.startTime);
  
  const allForks = await page.locator(selector);
  const total = await allForks.count();
  console.log('allForks - ' + total);
  
  for (let i = 1; i < total; ++i) {
    
    const rows = await page.locator(selector);
    console.log('fork - ' + i);
    await rows.nth(i).click();
    
    let stars = await page.locator('#repo-stars-counter-star').innerText();
    
    if(stars > result.max) {
      result.max = stars;
      result.winner = page.url();
      console.log('new max - ' + JSON.stringify(result));
    }
    
    await page.goBack();
  }
  
  console.log('winner - ' + JSON.stringify(result, null, 2));
});
