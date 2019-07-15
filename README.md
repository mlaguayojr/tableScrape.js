# tableScrape.js
a very simple html table scraper written in javascript.

# Why?
this was a proof-of-concept to see if i could do this / how would i do this ...

# Demo
https://codepen.io/mlaguayojr/pen/ydrzaV

# Example
```js
var example = new scraper({
  url: "https://www.w3schools.com/html/html_tables.asp",
  proxy: "https://cors-anywhere.herokuapp.com/",
  table_id: "customers",
  dump: "dump"
});

// at the end display summary
Promise.all([ ex.scrape() ]).then( results => {
  ex.summary();
});
```

# Syntax
|parameter|type|description|
|---------|----|-------------|
|url|required|website that contains the table you want to scrape|
|proxy|required|if CORS is an issue|
|table_id|optional|scrape only the table with this id. If this is not specified then the first table tag will be scraped|
|dump|optional|after scraping, display the data to a dump table|
