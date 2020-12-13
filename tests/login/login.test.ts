import { Builder, WebDriver, Capabilities, By } from 'selenium-webdriver';

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require('chromedriver');
const assert: IAssert = require('assert');

let capabilities = Capabilities.chrome();

capabilities.set('goog:chromeOptions', {
  args: [
    '--lang=en',
    'disable-infobars',
    '--disable-plugins',
    //'--headless' // <- use GUI or only console
  ]
});

describe('BAD - Authorization', function () {
  let driver: WebDriver;

  before(async function () {
    driver = await new Builder().withCapabilities(capabilities).build();
  });

  xit('Login with incorrect data', async function () {
    await driver.get('http://lab2.webtm.ru');
    driver.findElement(By.css('[ng-model="ctrl.email"]')).sendKeys('w@w.w');
    driver.findElement(By.css('[ng-model="ctrl.password"]')).sendKeys('1111111111');
    (await driver.findElement(By.css('[type="button"]'))).click()
    await driver.sleep(1000);
    let authorizationPasswordInput = driver.findElement(By.css('[ng-model="ctrl.password"]'));
    let exitAuthorizationPasswordInput = authorizationPasswordInput.then(() => true, () => false);
    await assert.equal(await exitAuthorizationPasswordInput, false);
  });

  it('Login with correct data', async function () {
    await driver.get('https://vk.com/');
    await driver.sleep(1000);
    driver.findElement(By.css('#index_email')).sendKeys('123456789');
    await driver.sleep(3000);
    driver.findElement(By.css('#index_pass')).sendKeys('123456789');
    await driver.sleep(3000);
    (await driver.findElement(By.css('#index_login_button'))).click()
    await driver.sleep(1000);
    let authorizationPasswordInput = driver.findElement(By.css('[name="login"] [placeholder="Телефон или email"]'));
    let exitAuthorizationPasswordInput = authorizationPasswordInput.then(() => true, () => false);
    await assert.equal(await exitAuthorizationPasswordInput, false);
  });

  after(() => driver && driver.quit());
});
