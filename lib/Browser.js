const {Builder, By, Key, until, logging} = require('selenium-webdriver');
const log = require('../logger');
const conf = require('../config');

class Browser {

  async build(){
    this.driver = new Builder().forBrowser(conf.browser).build();
  }
      
  async visit(sait){
    log.info('Open main page');
    await this.driver.get(sait);
  }
  
  async quit(){
    log.info('Close driver');
    await this.driver.quit();    
  }

  async back(){
    log.info('Navigate back');
    await this.driver.navigate().back();
  }

  async getUrl(){
    return this.driver.getCurrentUrl();
  }

  async login() {
    const authUrl = (await this.getUrl()).split('//');
    authUrl.splice(1,0,`//${conf.login}:${conf.password}@`);   
    await this.driver.navigate().to(authUrl.join(''));
}

 async switchToFrame(id){
   log.info(`switch to frame`);
  //  this.driver.wait(until.elementLocated(id),conf.time)
   this.driver.switchTo().frame(id);
  }
  
  async leaveFrame(){
    log.info(`leave from frame`);
    await this.driver.switchTo().defaultContent();
  }

}

module.exports = new Browser();