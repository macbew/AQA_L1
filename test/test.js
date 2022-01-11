const Browser = require('../lib/Browser');
const { assert } = require('chai');

const log = require('../logger');
const confTest = require('./testDate');
const conf = require('../config');
const pageAuth = require ('../lib/PageAuth');
const pageAlerts = require('../lib/PageAlerts');
const AlertElement = require("../lib/AlertElement");
const Randimizer = require ('../utils/Randomizer');
const PageSlider = require('../lib/PageSlider');
const PageHovers = require('../lib/PageHovers');
const PageIframe = require('../lib/PageIframe');


const  resultCase1Step1 = 'Congratulations! You must have the proper credentials.'; //очепятка переноса строки в тесткейсе
const  resultAlert = 'I am a JS Alert';
const  resultAlertClosed = 'You successfully clicked an alert';
const  openConfirm = 'I am a JS Confirm';
const  confirmResult = 'You clicked: Ok'; //очепятка регистра в тест кейсе
const  openPrompt = 'I am a JS prompt';
const  randomText = Randimizer.getRandomString();
const  randomNumb = Randimizer.getRandomNum(0,10);
const  promptResult = `You entered: ${randomText}`;

describe('scenarios', function(){
  this.timeout(conf.time);

  beforeEach( async function(){
    await Browser.build();
    await Browser.visit(conf.url);
  })
  
  afterEach (async function(){  
    await Browser.quit();     
  })  

  it('test case 1. Basic Authorization', async function(){
    await pageAuth.moveAuth();  
    await Browser.login();  
    assert.equal(await pageAuth.getTextResult(),resultCase1Step1, 'not match');   
  })

  it('test case 2. Alerts', async function(){
      log.info(`--------step 1 ----------------`);
    await pageAlerts.clickAlertLink();
    assert.equal(await pageAlerts.isDisplayed(), true,'Page is not open');
      log.info('Page is open');     
      log.info(`--------step 2 ----------------`);
    await pageAlerts.clickAlertBtn();
    assert.equal(await AlertElement.getAlertText(), resultAlert,'Alert result is not match');
      log.info('Alert message is displayed and correct');       
      log.info(`--------step 3 ----------------`);
    await AlertElement.clickAlertAccept();
    assert.equal(await AlertElement.isAlertClosed(),true,'Alert is open');
      log.info('Alert is closed'); 
      assert.equal(await pageAlerts.getAlertResult(),resultAlertClosed,'Result is not match');
      log.info('Result Alert message is displayed and correct'); 
      log.info(`--------step 4 ----------------`);
    await pageAlerts.clickBtnConfirm();
    assert.equal(await AlertElement.getAlertText(), openConfirm,'Confirm text is not match');
      log.info('Alert Confirm message is displayed and correct'); 
      log.info(`--------step 5 ----------------`);
    await AlertElement.clickAlertAccept();
    assert.equal(await AlertElement.isAlertClosed(),true,'Confirm is open');
      log.info('Alert is closed'); 
    assert.equal(await pageAlerts.getAlertResult(),confirmResult,'Result confirm is not match');
      log.info('Result Alert Confirm message is displayed and correct'); 
      log.info(`--------step 6 ----------------`);
    await pageAlerts.clickBtnPrompt();
    assert.equal(await AlertElement.getAlertText(), openPrompt,'Prompt text is not match');
      log.info('Alert Prompt message is displayed and correct');    
      log.info(`--------step 7 ---------------- В тесткейсе не указано точное место(in Result) отображения текста`)
    await AlertElement.sendAlertText(randomText);
    await AlertElement.clickAlertAccept();      
    assert.equal(await pageAlerts.getAlertResult(),promptResult, `result text not match`);
      log.info('Result Alert Prompt message is displayed and correct');  
  })

  it( `test case 3. Slider`,async function(){
      log.info(`-----------------step 1--------------`)
    await PageSlider.clickSliderLink();
    assert.equal(await PageSlider.isDisplayed(), true,'Page is not open');
      log.info('page is open');  
      log.info(`-----------------step 2--------------`)
    await PageSlider.moveSlider(randomNumb);
    assert.equal(await PageSlider.getValue(),randomNumb*await PageSlider.getStepAttribute(),'Invalide value');
    })
  
  confTest.user.forEach(async function(item){
    it( `test case 4. Hovers. User ${item}`,async function(){
        log.info(`-----------------step 1--------------`)
      await PageHovers.clickHovers();
        log.info(await PageHovers.isDisplayed());
      assert.equal(await PageHovers.isDisplayed(), true,'Page User is not open');
        log.info('-----------------step 2--------------')
      await PageHovers.moveTo(item);   
      assert.equal(await PageHovers.getLastLetterNameUser(item), await PageHovers.getLastLetterLinkUser(item),'user name is not correct');
      assert.equal(await PageHovers.isDisplayedLink(),true,'Link to profile is not displayed');
        log.info('-----------------step 3--------------');
      const urlStep2 = await Browser.getUrl();
      await PageHovers.clickUserLabel();
      assert.equal(await Browser.getUrl(),urlStep2,'Current page not matches Step 2 page');
        log.info('-----------------step 4--------------');      
      // Browser.back();
      assert.equal(await PageHovers.isDisplayed(), true,'Page User is not open');    
    })
  })
      
  it(`test case 5. Iframe`, async function (){
      log.info('-----------------step 1--------------');       
    await Browser.visit(conf.url+'/iframe');
    assert.equal(await PageIframe.isDisplayed(), true,'Page Iframe is not open');
      log.info('-----------------step 2--------------');      
    await PageIframe.clickAlignLeft();       
    await PageIframe.isALignCorrect();
    assert.equal(await PageIframe.isALignCorrect(),true,'Text formatting is not correct');
      log.info('-----------------step 3--------------');       
    await PageIframe.selectHalfText(); 
    await PageIframe.changeFont();
    //предпологаю опечатку формата размерности шрифта в кейсе(px-->pt)
    assert.equal( await PageIframe.isSizeCorrect(),true, `size in not correct`);
      log.info('-----------------step 4--------------');  
    await PageIframe.newDoc();  
    assert.isEmpty(await PageIframe.isEmptyText());   
  })

})





