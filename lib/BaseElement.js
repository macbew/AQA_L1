const { until, By } = require('selenium-webdriver');

const configDate = require('../config');
const Browser = require('./Browser');
const log = require('../logger');


class  BaseElement {
  constructor(locator, name){
    this.locator = locator;
    this.name = name;
  }

  async _findElem(){       
      log.info(`Find element:  ${this.name}`);
    await Browser.driver.wait(until.elementsLocated(this.locator),configDate.time);
    return Browser.driver.findElement(this.locator);         
  }
  
  async click(){
      log.info(`Click on the ${this.name}`);
    return  (await this._findElem()).click();
    }
    
  async getAttribute(attName){
      log.info(`Get attribute: ${attName}`);
    return (await this._findElem()).getAttribute(attName);
  }
  
  async isDisplayed() {  
      log.info(`Find elementS: ` + this.name);
    let arrEl = await Browser.driver.findElements(this.locator);
      log.info(`Found of elements: `+ arrEl.length);  
    return arrEl.length>0;
    }
    
  async isVisible(){
    return (await this._findElem(this.locator)).isDisplayed();
   }

   async getText(){    
    log.info(`Get text for ${this.name}`);
    return (await this._findElem(this.locator)).getText();    
  }
    
  async moveToElem(){      
      log.info(`move to element: `+ this.name);  
    await Browser.driver.actions().move({origin:this._findElem()}).perform();
  }

  async moveToAndPress(){
    await Browser.driver.actions({async:true}).move({origin:this._findElem()}).press().perform();
  }
  
  async moveToAndRelease(){
    await Browser.driver.actions({async:true}).move({origin:this._findElem()}).release().perform();
  }

  
}

module.exports = BaseElement;