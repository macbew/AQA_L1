let Page = require('./base_page');


Page.prototype.pageOpenMain = function(){
  return this.find("//*[@id='home_maincap_v7']");
}

Page.prototype.findGame = function(name) {
  return this.write('//input[@id="store_nav_search_term"]',name);
}

Page.prototype.clickSearsh = function(){
  return this.find('//a[@id="store_search_link"]//img').click();
}

Page.prototype.IsOpenSearsh = function(){
  return this.find('//*[@class="termcontainer"]');
}

Page.prototype.ListIsNotEmpty = function() {
  return this.find('//*[@id="search_resultsRows"]//a')
}

Page.prototype.Sorting = function(name){
  this.find('//*[@id="sort_by_trigger"]').click();
  this.find('//*[@id="Price_DESC"]').click();  
  let nameGame = name.split(' ').join('+'); 
  return this.waitUrl(`https://store.steampowered.com/search/?sort_by=Price_DESC&term=${nameGame}`)
}

Page.prototype.IsCorSort = async function(N){
  let arrr = await this.toArrAtrib(`(//*[@data-price-final])`,'data-price-final',N);
 
 return this.checkSort(arrr);
}

module.exports = Page;