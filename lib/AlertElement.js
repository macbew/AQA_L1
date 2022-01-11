const { until } = require("selenium-webdriver");

const Browser = require('./Browser');
const log = require("../logger");

class AlertElement {
  
  async isAlertClosed (){   
    try{
    await Browser.driver.switchTo().alert();
      return false;
    }
    catch(e){
    return true;
    }  
  }  
  
  async getAlertText(){
      log.info('get Alert text');
    Browser.driver.wait(until.alertIsPresent());
    return  Browser.driver.switchTo().alert().getText();
  }
    
  async clickAlertAccept(){
      log.info('click Alert accept');
    Browser.driver.wait(until.alertIsPresent());
    return  Browser.driver.switchTo().alert().accept();
  }
    
  async sendAlertText(someText){
      log.info('send Alert text');
    Browser.driver.wait(until.alertIsPresent());
    return Browser.driver.switchTo().alert().sendKeys(someText);    
  }
  
}

module.exports = new AlertElement();