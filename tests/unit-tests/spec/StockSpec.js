/*jslint browser: true, plusplus:true*/

describe("html tests", function () {

    var properties, methods;

    beforeEach(function () {
        var propertyName;

        app.init();

        properties = [];
        methods = [];
        for (propertyName in app) {
            if (app.hasOwnProperty(propertyName)) {
                if (app[propertyName].constructor === Function) {
                    methods.push(app[propertyName].prototype);
                } else {
                    properties.push(propertyName);
                }
            }
        }
    });

    afterEach(function () {
        document.body.removeChild(document.querySelector("#container"));
    });

    it("Should verify that the app has properties and methods.", function () {
        expect(properties.length).not.toBe(0);
        expect(methods.length).not.toBe(0);

    });

    it("Should verify that DOM elements are created for the container and the title", function () {
        var expectedValue = 'Real Time Stockquote App';
        var actualValue = app.initHTML().querySelector("h1").innerText;

        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that the table has 25 rows", function () {
        var actualValue = app.showData().querySelectorAll("tr").length;
        expect(actualValue).toBe(25)
    });


});


describe("method tests", function () {

    it("Should verify that only letters and numbers remain", function () {
        var actualValue = app.createValidCSSNameFromCompany("HGF>&^#%%$#@");
        var expectedValue = "HGF";
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that series is defined and is an object", function () {
        var actualValue = app.series;
        expect(actualValue).toBeDefined();
        expect(actualValue.constructor).toBe(Object);
    });

    it("Should verify retrieving realtime data cannot be tested", function () {
        var actualValue = app.getRealtimeData();
        var expectedValue = undefined;
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that ranges including min and max values are returned", function () {
        var input = 100, range = 5, hitMin = 0, hitMax = 0, i, r;

        for (i = 0; i < 1000; i++) {
            r = app.rnd(input, range);
            if (r === input - range) {
                hitMin++;
            } else if (r === input + range) {
                hitMax++;
            }
        }

        expect(hitMin).toBeGreaterThan(0);
        expect(hitMax).toBeGreaterThan(0);
    });

    it("Should verify that date is formatted mm/dd/yyyy", function () {
        var actualValue = app.getFormattedDate(new Date("Wed Mar 28 2015 00:00:00 GMT+0100 (W. Europe Standard Time)"));
        var expectedValue = "3/28/2015";
        expect(actualValue).toBe(expectedValue);
    });

    it("Should verify that time is formatted hh:mm", function () {
        var actualValue = "2:30";
        var expectedValue =  app.getFormattedTime(new Date("Wed Mar 28 2015 02:30:00 GMT+0100 (W. Europe Standard Time)"));
        expect(actualValue).toBe(expectedValue);
    });


    it("Should verify that new quote is added to series", function () {
        // setup
        var actualValue, unExpectedValue;
        app.series = {};

        app.parseData(data.query.results.row);
        app.generateTestData();

        unExpectedValue = undefined;
        actualValue = app.series;

        expect(actualValue).not.toBe(unExpectedValue);
    });

    it("Should verify that sample data is successfully parsed and added to the series", function () {
        // setup
        var actualValue, unExpectedValue;
        app.series = {};

        app.parseData(data.query.results.row);

        unExpectedValue = undefined;
        actualValue = app.series;

        expect(actualValue).not.toBe(unExpectedValue);
    });



});