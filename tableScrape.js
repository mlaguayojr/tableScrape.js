/*
  Mario Luis Aguayo, Jr.
  2019-07-15
  A simple HTML table scraper
*/

class scraper {
  constructor(params) {
    this.__defaults();
    this.__setParameters(params);
  }

  async scrape() {
    var url = this.url;
    await fetch(url)
      .then(req => {
        return req.text();
      })
      .then(resp => {
        var parser = new DOMParser();
        var html = parser.parseFromString(resp, "text/html");

        var table = undefined;

        // if user is looking for a specific table by id
        if (this.table_id !== undefined) {
          table = html.getElementById(`${this.table_id}`);
        } else {
          table = html.getElementsByTagName("table")[0];
        }

        var headers = [];

        var has_thead = table.querySelector("thead") == null;
        if (has_thead == false) {
          has_thead = true;
        }else{
          has_thead = false;
        }

        if (has_thead) {
          var thead = table.querySelector("thead");
          thead = thead.querySelector("tr");
          thead.querySelectorAll("th").forEach(col => {
            headers.push(col.innerText);
          });
        }

        var rows = [];

        var tbody = table.querySelector("tbody");

        tbody.querySelectorAll("tr").forEach((row, index) => {
          if (index == 0 && !has_thead) {
            row.querySelectorAll("th").forEach(col => {
              headers.push(col.innerText);
            });
          } else {
            var data = [];
            row.querySelectorAll("td").forEach(col => {
              data.push(col.innerText);
            });
            rows.push(data);
          }
        });

        this.headings = headers;
        this.data = rows;
      })
      .catch(error => {
        throw `scraping ${url} failed: ${error}`;
      });
    
    if(this.dump !== undefined){
      var elem = document.getElementById(`${this.dump}`);
      elem.innerHtml = "";
      var tr = document.createElement("tr");
      
      this.headings.forEach( (heading) => {
        var th = document.createElement("th");
        th.innerText = `${heading}`;
        tr.appendChild(th);
      });
      
      var thead = document.createElement("thead");
      thead.appendChild(tr);
      elem.appendChild(thead);
      
      var tbody = document.createElement("tbody");
      
      this.data.forEach( (row) => {
        var tr = document.createElement("tr");
        
        row.forEach( value => {
          var td = document.createElement("td");
          td.innerText = `${value}`;
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      elem.appendChild(tbody);
    }
  }

  __setParameters(params) {
    if (params.url !== undefined) {
      this.url = params.url;
    }

    if (params.proxy !== undefined) {
      this.proxy = params.proxy;
    }

    if (this.url !== undefined && this.proxy !== undefined) {
      this.url = this.proxy + this.url;
    }

    if (params.table_id !== undefined) {
      this.table_id = params.table_id;
    }
    
    if(params.dump !== undefined){
      this.dump = params.dump;
    }
  }

  __defaults() {
    this.url = undefined;
    this.proxy = undefined;
    this.table_id = undefined;
    this.headings = [];
    this.data = [];
    this.dump = undefined;
  }
  
  summary() {
    console.log(`results for ${this.url}`);
    
    if(this.headings.length != 0){
      console.log(`found ${this.headings.length} headings`);
    }
    
    console.log(`found ${this.data.length} rows`);
  }
  
}
