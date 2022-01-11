const { until, By } = require('selenium-webdriver');

const BaseForm = require("./BaseForm");
const Paragraph = require("./TextField");
const Button = require("./Button");
const Links = require('./Link');

const Link = new Links(By.xpath('//a[@href="/javascript_alerts"]'), 'Link to alerts');
const ElemResult = new Paragraph(By.xpath("//p[@id='result']"),'Paragraph result');
const locat = (nameLoc) =>By.xpath(`//button[contains(text(),'${nameLoc}')]`);
const ElemAlertButton = new Button(locat('Alert'),'Alert Button');
const ElemButtonConfirm = new Button(locat('Confirm'),'Confirm Button');
const ElemButtonPrompt = new Button(locat('Prompt'),'Prompt Button');

class PageAlerts extends BaseForm{
  constructor(){
    super(new Button(By.xpath("//button"),`Alert`),`pageAlerts`);
  }

  async clickAlertLink() {
    return Link.click();  
  }

  async clickAlertBtn() {
    return   ElemAlertButton.click();
  }

  async getAlertResult() { 
    return  ElemResult.getText();
  }

  async clickBtnConfirm() {  
    return  ElemButtonConfirm.click();
  }

  async clickBtnPrompt() {  
    return ElemButtonPrompt.click();
  }

}

module.exports = new PageAlerts();