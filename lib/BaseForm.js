const conf = require('../config');
const element = require ('./BaseElement');
const Browser = require('./Browser');




class BaseForm {
  constructor(element, name){
    this.element=element ;
    this.name = name;
  }  
 
  async isDisplayed(){
    return this.element.isDisplayed();
  }

  async comboKey(keyDown,keyDownUp){
    await Browser.driver.actions({async:true}).keyDown(keyDown).sendKeys(keyDownUp).perform(); 
  }

}

module.exports = BaseForm;