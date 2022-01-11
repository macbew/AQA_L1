const {Builder, By, Key, until} = require('selenium-webdriver');


class Page {
  constructor() {
    this.driver = new Builder().forBrowser('chrome').build();
    let driver = this.driver;

    this.visit = function (theUrl) {
      return driver.get(theUrl);
    };

    this.quit = function () {
      return driver.quit();
    };

    this.find = function (elem) {
      driver.wait(until.elementLocated(By.xpath(elem)), 5000);
      return driver.findElement(By.xpath(elem));
    };

    this.FindAll = function (elem) {
      driver.wait(until.elementsLocated(By.xpath(elem)), 5000);
      return driver.findElements(By.xpath(elem));
    };

    this.write = function (elem, txt) {
      return this.find(elem).sendKeys(txt);
    };

    this.waitUrl = function (url) {
      
      return driver.wait(until.urlIs(url), 9000);
      
    };

    this.checkSort = function (arr) {
      let ind = true;

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          ind = false;
        }
      }
      // console.log(ind)
      return ind;
    };

    this.toArrAtrib = async function (locator, atrib, Num) {
      let priceArr = [];
      let elemen;

      for (let i = 1; i <= Num; i++) {
        elemen = await driver.findElement(By.xpath(locator + `[${i}]`)).getAttribute(atrib);
        priceArr.push(elemen - 0);
      }
      return priceArr;
    };
  }
}
module.exports = Page;