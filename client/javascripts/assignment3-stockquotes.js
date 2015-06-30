
/*jslint browser: true, regexp: true*/
/*global app, data, io */

(function () {
    "use strict";

    window.app = {

        settings: {
            refresh: 1000,
            ajaxUrl: "http://server7.tezzt.nl/~theotheu/stockquotes/index.php",
            dataPoints: 100
        },

        series : {},

        socket : io("http://server7.tezzt.nl:1333"),

        rnd: function (input, range) {
            // return a value between min and max,
            // eg. if the current value is 100,
            // then the new value will be a float between
            // 100-min, 100+max
            var min, max;

            max = input + range;
            min = input - range;

            return Math.floor(
                Math.random() * (max - min + 1)
            ) + min;
        },

        getFormattedDate: function (date) {
            // Return a formatted date string that looks like
            // month/day/year
            // year is 4 digits
            return ((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
        },

        getFormattedTime: function (date) {
            // am, pm
            var minutes = date.getMinutes();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return (date.getHours() + ":" + minutes);
        },

        generateTestData: function () {
            var company, quote, newQuote;

            for (company in app.series) {
                if (app.series.hasOwnProperty(company)) {
                    quote = app.series[company][0];
                    newQuote = Object.create(quote);
                    newQuote.col0 = app.createValidCSSNameFromCompany(quote.col0); // gets company names from data.js
                    newQuote.col1 = app.rnd(1, 100); // new value
                    newQuote.col2 = app.getFormattedDate(new Date()); // new date
                    newQuote.col3 = app.getFormattedTime(new Date()); // new time
                    newQuote.col4 = app.rnd(1, 100); // difference of price value between this one and the previous quote
                    newQuote.col5 = 'N/A';
                    newQuote.col6 = 'N/A';
                    newQuote.col7 = 'N/A';
                    newQuote.col8 = app.rnd(1000, 1000);

                    //app.series[company].push(newQuote);
                    app.addToSeries(company, newQuote);
                }
            }
        },

        parseData: function (rows) {
            var i, company;

            //iterate over the rows and add to the series
            for (i = 0; i < rows.length; i += 1) {
                company = rows[i].col0;

                //check if array for company exists
                if (app.series[company] !== undefined) {
                    app.series[company].push(rows[i]);
                } else {
                    //company does not yet exist
                    app.series[company] = [rows[i]];
                }
            }
        },

        createValidCSSNameFromCompany: function (str) {
            //regular expression to remove everything
            //that is not out of A-z0-9\
            return str.replace(/[^a-zA-Z0-9]/g, "");
        },


        showData: function () {
            //return value is a dom
            var company, table, row, quote, cell, propertyName, propertyValue, tableHeader, l, i;


            //create table
            table = document.createElement("table");

            //create header

            for (i = 0; i < 9; i += 1) {
                tableHeader = document.createElement("th");
                if (i === 0) {
                    tableHeader.innerText = 'Symbol';
                    table.appendChild(tableHeader);
                } else if (i === 1) {
                    tableHeader.innerText = 'Last Trade (Price Only)';
                    table.appendChild(tableHeader);
                } else if (i === 2) {
                    tableHeader.innerText = 'Date of Last Trade';
                    table.appendChild(tableHeader);
                } else if (i === 3) {
                    tableHeader.innerText = 'Time of Last Trade';
                    table.appendChild(tableHeader);
                } else if (i === 4) {
                    tableHeader.innerText = 'Change (in points)';
                    table.appendChild(tableHeader);
                } else if (i === 5) {
                    tableHeader.innerText = 'Open Price';
                    table.appendChild(tableHeader);
                } else if (i === 6) {
                    tableHeader.innerText = "Days High";
                    table.appendChild(tableHeader);
                } else if (i === 7) {
                    tableHeader.innerText = "Days Low";
                    table.appendChild(tableHeader);
                } else if (i === 8) {
                    tableHeader.innerText = 'Volume';
                    table.appendChild(tableHeader);
                }
            }

            //create rows
            for (company in app.series) {
                if (app.series.hasOwnProperty(company)) {
                    l = app.series[company].length - 1;
                    quote = app.series[company][l];
                    row = document.createElement("tr");
                    row.id = app.createValidCSSNameFromCompany(company);

                    //create cells
                    table.appendChild(row);

                    //iterate over quote to create cells
                    for (propertyName in quote) {
                        if (quote.hasOwnProperty(propertyName)) {
                            propertyValue = quote[propertyName];
                            cell = document.createElement("td");
                            cell.innerText = propertyValue;
                            row.appendChild(cell);
                        }
                    }
                    //adds class names to rows, so that it can be styled accordingly
                    if (quote.col4 < 0) {
                        row.className = 'loser';
                    } else if (quote.col4 > 0) {
                        row.className = 'winner';
                    } else if (quote.col4 === 0) {
                        row.className = 'neutral';
                    }
                }
            }

            return table;
        },

        getDataFromAJAX: function () {
            var xhr;
            xhr = new XMLHttpRequest();
            xhr.open("GET", app.settings.ajaxUrl);
            xhr.addEventListener('load', app.retrieveJSON);
            xhr.send();
        },

        retrieveJSON: function (e) {
            var str, obj, rows;
            str = e.target.responseText;
            obj = JSON.parse(str);
            rows = obj.query.results.row;
            app.parseData(rows);
        },

        getRealtimeData: function () {
            app.socket.on("stockquotes", function (data) {
                app.parseData(data.query.results.row);
            });
        },

        //pushes to the end of the array
        //if the array gets bigger than dataPoints, it removes the first element
        addToSeries: function (c, q) {
            app.series[c].push(q);
            if (app.series[c].length > app.settings.dataPoints) {
                app.series[c].shift();
            }
        },

        loop: function () {
            var table;

            app.getDataFromAJAX(); //Should be used to retrieve data
            //app.generateTestData(); //generateTestData in case of no internet connection


            table = app.showData();
            //remove old table
            //if table exists, then run this
            if (document.querySelector("table")) {
                document.querySelector("#container").removeChild(document.querySelector("table"));
            }

            //add new table
            if (!(document.querySelector("table"))) {
                app.container.appendChild(table);
            }


            //set time out so that it refreshes
            window.setTimeout(app.loop, app.settings.refresh);

        },

        initHTML: function () {
            var container, h1Node;

            container = document.createElement("div");
            container.id = "container";

            app.container = container;

            h1Node = document.createElement("h1");
            h1Node.innerText = "Real Time Stockquote App";

            app.container.appendChild(h1Node);

            document.querySelector("body").appendChild(app.container);

            return app.container;
        },

        init: function () {
            var domNodes;
            domNodes = app.initHTML();
            document.body.appendChild(domNodes);
            app.loop();

            //gets sample data from data.js for generating test data
            app.parseData(data.query.results.row);


            //app.getRealtimeData(); //websockets
        }
    };
}());