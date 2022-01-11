const { until, By, Key } = require('selenium-webdriver');

const log = require('../logger');
const BaseForm = require('./BaseForm');
const Paragraph = require('./TextField');
const Links = require('./Link');
const Img = require('./Img');

const hoversLink = new Links(By.xpath(`//a[@href="/hovers"]`),'hovers link');
let userImg;
let linkProfil;


class PageHovers extends BaseForm {
  constructor(){
    super(new Img(By.xpath(`//*[@alt='User Avatar']`),`user img`),'pageHover');
  }
  
  async clickHovers(){
    await hoversLink.click();
  }
  
  async moveTo(item){
    userImg = new Img(By.xpath(`//*[@href="/users/${item}"]/ancestor::*[2]`), 'user container');
    await userImg.moveToElem();
  }
  
  async getLastLetterNameUser (item){
    const nameUser = new Paragraph(By.xpath(`//*[@href="/users/${item}"]/ancestor::*[2]//h5`),'user name');
    const lastLetterName = (await nameUser.getText()).split('').pop();
    return lastLetterName    
  }

  async getLastLetterLinkUser(item){
    linkProfil = new Paragraph(By.xpath(`//*[@href="/users/${item}"]`),'link profil');
    const lastLetterLink = (await linkProfil.getAttribute('href')).split('').pop();    
    return lastLetterLink
  }
  
  async isDisplayedLink(){
    return linkProfil.isVisible();
  }

  async clickUserLabel(){
    await userImg.click();
  }  

}

module.exports = new PageHovers();