import { expect } from 'chai';
import { Builder, By } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';

let driver;

describe('UI tests', function () {
  this.timeout(120000); // Increase the timeout to 2 minutes

  before(async function () {
    console.log('Setting up WebDriver...');
    try {
      driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .usingServer('http://localhost:4444/wd/hub') // Updated endpoint
        .build();
      console.log('WebDriver setup complete.');
    } catch (err) {
      console.error('Error setting up WebDriver:', err);
      throw err;
    }
  });

  after(async function () {
    console.log('Quitting WebDriver...');
    try {
      if (driver) {
        await driver.quit();
      }
      console.log('WebDriver quit successfully.');
    } catch (err) {
      console.error('Error quitting WebDriver:', err);
    }
  });

  it('should have the correct page title', async function () {
    console.log('Running test: should have the correct page title');
    try {
      await driver.get('http://localhost:3000');
      const title = await driver.getTitle();
      console.log('Page title:', title);
      expect(title).to.equal('Bloggerline');
    } catch (err) {
      console.error('Error in test "should have the correct page title":', err);
      throw err;
    }
  });

//   it('should click on the LOGIN button', async function () {
//     console.log('Running test: should click on the LOGIN button');
//     try {
//       await driver.get('http://localhost:3000');
//       const loginLink = await driver.findElement(By.linkText('LOGIN'));
//       await loginLink.click();
//     } catch (err) {
//       console.error('Error in test "should click on the LOGIN button":', err);
//       throw err;
//     }
//   });

//   it('should log in successfully with valid credentials', async function () {
//     console.log('Running test: should log in successfully with valid credentials');
//     try {
//       const usernameInput = await driver.findElement(By.css('input[placeholder="Enter your Username..."]'));
//       await usernameInput.sendKeys('trial'); 
//       const passwordInput = await driver.findElement(By.css('input[placeholder="Enter your password..."]'));
//       await passwordInput.sendKeys('trial'); 
//       const loginButton = await driver.findElement(By.css('.loginButton'));
//       await loginButton.click();
//     } catch (err) {
//       console.error('Error in test "should log in successfully with valid credentials":', err);
//       throw err;
//     }
//   });

  it('should select a rating and submit it', async function () {
    console.log('Running test: should select a rating and submit it');
    try {
      await driver.get('http://localhost:3000/post/6660385867e5cbf9ae29e294');
      await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await driver.sleep(1000);
      const ratingSelect = await driver.findElement(By.css('.select-rating-container select'));
      await ratingSelect.sendKeys('5');
      const submitRatingButton = await driver.findElement(By.css('.select-rating-container button'));
      await submitRatingButton.click();
    } catch (err) {
      console.error('Error in test "should select a rating and submit it":', err);
      throw err;
    }
  });

  it('should display search input and category dropdown', async function () {
    console.log('Running test: should display search input and category dropdown');
    try {
      await driver.get('http://localhost:3000');
      const searchInput = await driver.findElement(By.id('search'));
      expect(await searchInput.isDisplayed()).to.be.true;
      const categoryDropdown = await driver.findElement(By.id('categories'));
      expect(await categoryDropdown.isDisplayed()).to.be.true;
    } catch (err) {
      console.error('Error in test "should display search input and category dropdown":', err);
      throw err;
    }
  });

  it('should allow entering text into the search input', async function () {
    console.log('Running test: should allow entering text into the search input');
    try {
      await driver.get('http://localhost:3000');
      const searchInput = await driver.findElement(By.id('search'));
      await searchInput.sendKeys('React');
      const value = await searchInput.getAttribute('value');
      expect(value).to.equal('React');
    } catch (err) {
      console.error('Error in test "should allow entering text into the search input":', err);
      throw err;
    }
  });

  it('should click on the write button', async function () {
    console.log('Running test: should click on the write button');
    try {
      await driver.get('http://localhost:3000');
      const writeLink = await driver.findElement(By.linkText('WRITE'));
      await writeLink.click();
    } catch (err) {
      console.error('Error in test "should click on the write button":', err);
      throw err;
    }
  });
});
