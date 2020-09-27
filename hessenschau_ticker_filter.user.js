// ==UserScript==
// @name        Hessenschau Ticker Filter
// @namespace   https://github.com/deraffe
// @match       https://www.hessenschau.de/neu/index.html
// @grant       none
// @version     0.1
// @author      deraffe
// @description Make the Hessenschau Ticker more readable and filter out uninteresting stuff
// ==/UserScript==

function q(s) {
  return document.querySelector(s)
}

// transform first entry into regular list item
if (q('.c-clusterTeaser__firstEntry')) {
  var firstEntry = document.querySelector('.c-clusterTeaser__firstEntry')
  var firstEntryWrapper = firstEntry.querySelector('.c-clusterTeaser__firstEntryWraper')
  var newFirstEntry = document.createElement('li')
  newFirstEntry.className = 'c-clusterTeaser__item'
  for (let item of Array.from(firstEntryWrapper.childNodes)) {
    newFirstEntry.appendChild(item)
  }
  firstEntry.remove()
}

// TODO get categories to filter from settings
// see https://wiki.greasespot.net/GM.setValue
var excludeCategories = ['Sport']

// filter entries
if (q('.c-clusterTeaser__list')) {
  var list = q('.c-clusterTeaser__list')
  list.insertBefore(newFirstEntry, list.firstChild)
  for (let item of Array.from(list.children)) {
    var category = item.querySelector('p').firstChild.textContent.trim()
    console.debug(item, category)
    if (excludeCategories.indexOf(category) > -1) {
      console.debug('Removing item')
      item.remove();
    }
  }
}