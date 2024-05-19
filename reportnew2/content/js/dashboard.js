/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 95.279, "KoPercent": 4.721};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.90177, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.97185, 500, 1500, "Delete hero"], "isController": false}, {"data": [0.97065, 500, 1500, "Change hero"], "isController": false}, {"data": [0.869875, 500, 1500, "Get hero by ID"], "isController": false}, {"data": [0.7315, 500, 1500, "HTTP Request Get all heroes"], "isController": false}, {"data": [0.964975, 500, 1500, "HTTP Request Make hero"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 100000, 4721, 4.721, 1116.4900100000145, 0, 35940, 5.0, 40.0, 2101.7500000000036, 30045.0, 1609.4506944779748, 524.1754897256691, 338.9851300587047], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Delete hero", 20000, 467, 2.335, 38.74240000000036, 0, 10422, 6.0, 42.0, 189.95000000000073, 460.900000000016, 330.87931177103155, 98.40594690938043, 76.37020871246588], "isController": false}, {"data": ["Change hero", 20000, 486, 2.43, 38.98900000000005, 0, 10415, 6.0, 40.0, 187.0, 476.9900000000016, 327.16089772950335, 65.61924273498332, 80.103141306926], "isController": false}, {"data": ["Get hero by ID", 20000, 674, 3.37, 561.2746000000012, 0, 30096, 7.0, 1032.0, 2884.800000000003, 5310.0, 325.6162287128391, 87.17970683346358, 66.36999975578783], "isController": false}, {"data": ["HTTP Request Get all heroes", 20000, 2590, 12.95, 4897.20275, 1, 35940, 8.0, 30007.0, 30117.0, 30878.0, 321.90050055527837, 184.8614689879046, 42.14161660443257], "isController": false}, {"data": ["HTTP Request Make hero", 20000, 504, 2.52, 46.24130000000046, 0, 10391, 7.0, 47.900000000001455, 219.0, 916.9800000000032, 326.81874632328913, 94.26486718903196, 79.32253218653997], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 4628, 98.030078373226, 4.628], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Программа на вашем хост-компьютере разорвала установленное подключение", 5, 0.10590976488032197, 0.005], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 88, 1.8640118618936665, 0.088], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 100000, 4721, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 4628, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 88, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Программа на вашем хост-компьютере разорвала установленное подключение", 5, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Delete hero", 20000, 467, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 464, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 2, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Программа на вашем хост-компьютере разорвала установленное подключение", 1, "", "", "", ""], "isController": false}, {"data": ["Change hero", 20000, 486, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 486, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Get hero by ID", 20000, 674, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 673, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Программа на вашем хост-компьютере разорвала установленное подключение", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request Get all heroes", 20000, 2590, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 2501, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: localhost:3001 failed to respond", 86, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Программа на вашем хост-компьютере разорвала установленное подключение", 3, "", "", "", ""], "isController": false}, {"data": ["HTTP Request Make hero", 20000, 504, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 504, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
