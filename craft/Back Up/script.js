$(function () {
    let csv = "./data/covid-19/data/worldwide-aggregated.csv"
    //Worldwide Aggregated
    let wwAggregated = "./Book1.csv"
    $(document).ready(function () {
        let convertedJSON;
        $.ajax({
            url: wwAggregated,
            dataType: "text",
            success: function (data) {
                convertedJSON = csvJSON(data)
                console.log(convertedJSON[4]);
            }
        })
    })
})
//var csv is the CSV contents with headers
function csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');
    lines.splice(0, 1);
    lines.forEach(function (line) {
        var obj = {};
        var currentline = line.split(',');
        headers.forEach(function (header, i) {
            obj[header] = currentline[i];
        });
        result.push(obj);
    });
    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [];
    var headers = [];
    var headersFound = false;
    var headerIndex = 0;

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push({});
            headersFound = true;
            headerIndex = 0;
        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        if (!headersFound) {
            headers.push(strMatchedValue);
        } else {
            arrData[arrData.length - 1][headers[headerIndex]] = strMatchedValue;
            headerIndex++;
        }
    }

    // Return the parsed data.
    return (arrData);
}

function csvFileToJSON(file) {
    if (!window.FileReader || !window.File) {
        return Promise.reject('Does not support File API');
    }
    if (!(file instanceof File)) {
        return Promise.reject('Not a file');
    }

    return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onerror = function (err) {
            reject(err);
        };

        // Closure to capture the file information.
        reader.onload = function () {
            var text = reader.result;
            resolve(CSVToArray(text));
        };

        // Read in the image file as a data URL.
        reader.readAsText(file);
    });
}