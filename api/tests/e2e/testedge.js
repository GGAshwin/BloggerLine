import { expect } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';

let driver;

describe('UI tests', function () {
  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should have the correct page title', async function () {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    expect(title).to.equal('Bloggerline');
  });

  it('should click on the LOGIN button', async function () {
    await driver.get('http://localhost:3000');

    const loginLink = await driver.findElement(By.linkText('LOGIN'));
    await loginLink.click();
  });

  it('should log in successfully with valid credentials', async function () {
  
    const usernameInput = await driver.findElement(By.css('input[placeholder="Enter your Username..."]'));
    await usernameInput.sendKeys('sam'); 

    
    const passwordInput = await driver.findElement(By.css('input[placeholder="Enter your password..."]'));
    await passwordInput.sendKeys('sam'); 

    
    const loginButton = await driver.findElement(By.css('.loginButton'));
    await loginButton.click();
  });
  

it('should select a rating and submit it', async function () {
    await driver.get('http://localhost:3000/post/665a1b476a22aaee3ed5869c');
  
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
  
    await driver.sleep(1000);
  
    const ratingSelect = await driver.findElement(By.css('.select-rating-container select'));
  
    await ratingSelect.sendKeys('5');
  
    const submitRatingButton = await driver.findElement(By.css('.select-rating-container button'));
    await submitRatingButton.click();
  });
  

  it('should display search input and category dropdown', async function () {
    await driver.get('http://localhost:3000');

    const searchInput = await driver.findElement(By.id('search'));
    expect(await searchInput.isDisplayed()).to.be.true;

    const categoryDropdown = await driver.findElement(By.id('categories'));
    expect(await categoryDropdown.isDisplayed()).to.be.true;
  });

  it('should allow entering text into the search input', async function () {
    await driver.get('http://localhost:3000');

    const searchInput = await driver.findElement(By.id('search'));
    await searchInput.sendKeys('React');
    const value = await searchInput.getAttribute('value');
    expect(value).to.equal('React');
  });

  it('should click on the write button', async function () {
    await driver.get('http://localhost:3000');

    const loginLink = await driver.findElement(By.linkText('WRITE'));
    await loginLink.click();
  });

  // it('should log in successfully with valid credentials', async function () {
  
  //   const usernameInput = await driver.findElement(By.css('input[placeholder="Enter your Username..."]'));
  //   await usernameInput.sendKeys('sam'); 

    
  //   const passwordInput = await driver.findElement(By.css('input[placeholder="Enter your password..."]'));
  //   await passwordInput.sendKeys('sam'); 

    
  //   const loginButton = await driver.findElement(By.css('.loginButton'));
  //   await loginButton.click();
  // });

  // it('should write and post a blog', async function () {
  //   await driver.get('http://localhost:3000/write');

  //   // Wait for the write form to be visible
  //   await driver.wait(until.elementLocated(By.css('.writeForm')), 5000);

  //   // Enter the blog title
  //   const titleInput = await driver.findElement(By.css('input[placeholder="Title"]'));
  //   await titleInput.sendKeys('Test Blog Title');

  //   // Enter the blog description
  //   const descInput = await driver.findElement(By.css('textarea[placeholder="Tell your story..."]'));
  //   await descInput.sendKeys('This is a test blog description.');

  //   // Enter the image URL (optional)
  //   const imageInput = await driver.findElement(By.css('input[placeholder="Image URL (Optional)"]'));
  //   await imageInput.sendKeys('https://example.com/test-image.jpg');

  //   // Add a category tag
  //   const tagInput = await driver.findElement(By.css('.ReactTags__tagInputField'));
  //   await tagInput.sendKeys('Test Category');
  //   await tagInput.sendKeys('\uE007'); // Press Enter key

  //   // Submit the blog post
  //   const submitButton = await driver.findElement(By.css('.writeSubmit'));
  //   await submitButton.click();

  //   // Wait for redirection to the new post
  //   await driver.wait(until.urlContains('/post/'), 5000);

  //   // Verify the post title on the new page
  //   const postTitle = await driver.findElement(By.css('.postTitle'));
  //   const postTitleText = await postTitle.getText();
  //   expect(postTitleText).to.equal('Test Blog Title');
  // });
  

  //   it('should scroll to the bottom of the page and add a comment', async function () {
//     // Navigate to the SinglePost page
//     await driver.get('http://localhost:3000/post/6659fa359cc87cacc0b6d566');

//     await driver.sleep(1000);

//     // Scroll to the bottom of the page
//     await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');

//     // Wait for a brief moment to ensure scrolling is complete
//     await driver.sleep(3000);

//     // Wait for the comment input field to be visible
//     const commentInput = await driver.wait(until.elementLocated(By.css('.commentInput')), 10000);

//     // Add a comment
//     await commentInput.sendKeys('This is a test comment');

//     // Click the post comment button
//     const postCommentButton = await driver.findElement(By.css('button[type="submit"]'));
//     await postCommentButton.click();

//     // Wait for the comment to be added
//     await driver.wait(until.elementLocated(By.xpath('//div[@class="comment"]/p[contains(text(), "This is a test comment")]')), 5000);
//   });


  // it('should log out successfully', async function () {
  //   // Assuming we are now logged in and on some other page
  //   // For demonstration purposes, let's navigate to the settings page
  //   await driver.get('http://localhost:3000');

  //   // Wait until the LOGOUT link is visible
  //   const logoutLink = await driver.wait(until.elementLocated(By.linkText('LOGOUT')), 5000);

  //   // Click the LOGOUT link
  //   await logoutLink.click();

  //   // Verify if the user is redirected to the login page
  //   const currentUrl = await driver.getCurrentUrl();
  //   expect(currentUrl).to.equal('http://localhost:3000');
  // });
});
