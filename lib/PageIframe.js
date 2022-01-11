const { until, By, Key } = require('selenium-webdriver');
const BaseElement = require("./BaseElement");
const Button = require(`./Button`);
const BaseForm = require("./BaseForm");
const Paragraph = require('./TextField');
const Browser = require('./Browser');
const Label = require('./Label');
const log = require('../logger');

const fontLabel = new Label(By.xpath(`//*[@title="Font sizes"]`),'Font size label')
const newDoc = new Label(By.xpath(`//*[@title="New document"]`),'New Document label')
const sizeLabel = new Label(By.xpath(`//*[@title="8pt"]`),'size label')
const buttonAlignLeft = new Button(By.xpath(`//button[@aria-label="Align left"]`),`Align button`);
const buttonFile = new Button(By.xpath(`//span[contains(text(),"File")]/..`),`File button`);
const buttonFormat = new Button(By.xpath(`//span[contains(text(),"Format")]/..`),`Format button`);
const paragraf = new Paragraph(By.xpath(`//*[@id="tinymce"]/p`), `iframe paragraph`);
const text8pt = new Paragraph(By.xpath(`//*[contains(@style,'8pt')]`), `text 8pt`);


class PageIframe extends BaseForm{
  constructor(){
    super(new BaseElement(By.xpath(`//iframe[@id="mce_0_ifr"]`),'iframe'),'page iframe')
  }
  
  async clickAlignLeft(){
    log.info('Click on Align button');
    await buttonAlignLeft.moveToAndPress()
    await buttonAlignLeft.moveToAndRelease()
   }

   async isALignCorrect(){      
     await Browser.switchToFrame(0);
     return (await paragraf.getAttribute('style') == 'text-align: left;');
     
    }
    
    async selectHalfText(){
      const textParagraf = await paragraf.getText();
      for(let i=0; i<=textParagraf.length/2; i++ ){
        await paragraf.sendData(Key.ARROW_RIGHT);
      }
      await super.comboKey(Key.SHIFT,Key.PAGE_UP);
    }
    
    async changeFont(){
      await Browser.leaveFrame();
      await buttonFormat.click();
      await fontLabel.moveToElem();
      await sizeLabel.click();
    }
    
    async isSizeCorrect(){
      await Browser.switchToFrame(0);
      const styleText = await text8pt.getAttribute('style');
       log.info(styleText);
      return styleText.split(' ').includes('8pt;');
    }
    
    async newDoc(){
      await Browser.leaveFrame();
      await buttonFile.click();
      await newDoc.click();
    }
    
    async isEmptyText(){
      await Browser.switchToFrame(0);
      return paragraf.getText();
    }
  }
  
  module.exports = new PageIframe()