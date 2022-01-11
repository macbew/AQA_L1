const { until, By, Key } = require('selenium-webdriver');

const log = require('../logger');
const BaseForm = require('./BaseForm');
const TextField = require('./TextField');
const Links = require('./Link');
// const Input = require('./TextField');

const sliderValue = new TextField(By.xpath(`//*[@id='range']`),'Slider value');
const sliderLink = new Links(By.xpath(`//a[@href="/horizontal_slider"]`),'horizontal slider link');
const rangeInput = new TextField(By.xpath(`//div[@class='sliderContainer']//input`));

class PageSlider extends BaseForm {
  constructor(){
    super(new TextField(By.xpath(`//input`),'Input'),'pageSlider');
  }

  async clickSliderLink(){
    log.info('Navigate to slider page');
    await sliderLink.click();
  }
  
  async moveSlider(numb){
    const value = await sliderValue.getText();    
    
    if(value){
      for (let i=1; i<=(value*2); i++){
        await rangeInput.sendData(Key.ARROW_LEFT);
      }
    }

    for (let i=1; i<=numb; i++){
      await rangeInput.sendData(Key.ARROW_RIGHT);
    }
     log.info(`Move point ${numb} step`);
  }

  async getValue(){
    const value = await sliderValue.getText();
    return value
  }

  async getStepAttribute(){
    return rangeInput.getAttribute('step');
  }

}

module.exports = new PageSlider();