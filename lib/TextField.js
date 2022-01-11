const log = require('../logger');
const BaseElement = require('./BaseElement');

class TextField extends BaseElement {
     
    async sendData(data){    
    log.info(`Send ${data}`);
    return (await this._findElem(this.locator)).sendKeys(data);
  }

}

module.exports = TextField;