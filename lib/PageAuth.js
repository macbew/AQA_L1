const { until, By } = require('selenium-webdriver');

const log = require('../logger');
const BaseForm = require('./BaseForm');
const Paragraph = require('./TextField');
const Links = require('./Link');

const Result = new Paragraph(By.xpath(`//*[@id='content']//p`),'result label');
const alertLink = new Links(By.xpath(`//a[@href="/basic_auth"]`),'basic auth link');

class PageAuth extends BaseForm {

 async moveAuth(){      
     log.info('Navigate to auth');
   await alertLink.click();
  } 
  
  async getTextResult (){   
    return Result.getText();
  }

}

module.exports = new PageAuth();