// @ts-check
const { test, expect } = require('@playwright/test');

test('check most stars from forks', async ({ page }) => {
  console.log('setTimeout - ' + process.env.TIMEOUT);
  test.setTimeout(process.env.TIMEOUT);
  
  await page.goto('https://github.com/NomicFoundation/hardhat-boilerplate/network/members');
  
  const selector = '.repo > a:last-child';
  let result = {};
  result.max = '0';
  
  result.startTime = Date.now();
  console.log('startTime - ' + result.startTime);
  
  const elements = page.locator(selector);
  const allForks = await elements.evaluateAll((forks) => forks.map(e => e.href));
  console.log('allForks - ' + allForks.length);
  
  for (let i = 1; i < allForks.length; ++i) {
    
    console.log('fork - ' + i);
    
    await page.goto(allForks[i], { waitUntil: 'commit'});
    
    // await page.waitForNavigation({ waitUntil: 'commit'});
    
    const element = await page.waitForSelector('#repo-stars-counter-star');
    let stars = await element.innerText();
    
    if(stars > result.max) {
      result.max = stars;
      result.winner = await page.url();
      console.log('new max - ' + JSON.stringify(result));
    }
  }
  
  console.log('winner - ' + JSON.stringify(result, null, 2));
});
