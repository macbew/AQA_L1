let Page = require('../lib/home_page');
let page;
let chai = require('chai');
let conf = require('../lib/config');
let chaiAspromised = require('chai-as-promised');
const { assert } = require('chai');
let shold = chai.should()
chai.use(chaiAspromised)
let game1 =conf.game1.name;
let game2 =conf.game2.name;
let N1 =conf.game1.N;
let N2 =conf.game2.N;


describe('app scenarios', function(){
  this.timeout(50000)

  beforeEach( async function(){
  page = new Page();
  await page.visit('https://store.steampowered.com/')
  })

  afterEach (async function(){  
    await page.quit();
  })  

  it('test first game',async function(){ 
    assert.isNotEmpty(await  page.pageOpenMain(),'Page did not load');
    await page.findGame(game1);
    await page.clickSearsh();    
    assert.isNotEmpty(await page.IsOpenSearsh(),'Page search did not load');
    assert.isNotEmpty( await page.ListIsNotEmpty(),'List games is empty')
    await page.Sorting(game1);
    assert.isTrue(await page.IsCorSort(N1),'Sorting is not correct')
       
  })
  
  it('test second game',async function(){ 
    assert.isNotEmpty(await  page.pageOpenMain(),'Page did not load');
    await page.findGame(game2);
    await page.clickSearsh();    
    assert.isNotEmpty(await page.IsOpenSearsh(),'Page search did not load');
    assert.isNotEmpty( await page.ListIsNotEmpty(),'List games is empty')
    await page.Sorting(game2);
    assert.isTrue(await page.IsCorSort(N2),'Sorting is not correct')
       
  })

  
})