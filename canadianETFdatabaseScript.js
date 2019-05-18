var providerArray = [];
var fundNameArray = [];
var tickerArray = [];
var categoryArray = [];
var AUMArray = [];
var MERArray = [];
var oneYearArray = [];
var fiveYearArray = [];
var tenYearArray = [];
var inceptionArray = [];
var yieldArray = [];
var startDateArray = [];

var dataLength = 0;

var mainTable = document.getElementById("mainTable");

var numberCol = 12;

var header1 = document.getElementById("header1");
var header2 = document.getElementById("header2");
var header3 = document.getElementById("header3");
var header4 = document.getElementById("header4");
var header5 = document.getElementById("header5");
var header6 = document.getElementById("header6");
var header7 = document.getElementById("header7");
var header8 = document.getElementById("header8");
var header9 = document.getElementById("header9");
var header10 = document.getElementById("header10");
var header11 = document.getElementById("header11");
var header12 = document.getElementById("header12");

var arrow1 = document.getElementById("arrow1");
var arrow2 = document.getElementById("arrow2");
var arrow3 = document.getElementById("arrow3");
var arrow4 = document.getElementById("arrow4");
var arrow5 = document.getElementById("arrow5");
var arrow6 = document.getElementById("arrow6");
var arrow7 = document.getElementById("arrow7");
var arrow8 = document.getElementById("arrow8");
var arrow9 = document.getElementById("arrow9");
var arrow10 = document.getElementById("arrow10");
var arrow11 = document.getElementById("arrow11");
var arrow12 = document.getElementById("arrow12");

var chart1;
var chart2;
var chart3;
var chart4;
var chart5;

//Access google sheet spreadsheet using tabletop
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1b14OfwCeqGdTFtd8rvqxM1rwaj2w9ALW8A7WP0B44wc/edit?usp=sharing';

//main method
init();
sortingArrows();

function init() {
    Tabletop.init( {
        key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true,
        debug:true
    })
}

//Turn JSON from Tabletop into arrays -- generate full arrays
function showInfo(data, tabletop) {

    //generate full arrays pulled from the master google sheets spreadsheet
    for (i=0;i<data.length;i++) {
        providerArray[i] = String(data[i].Provider);
        fundNameArray[i] = String(data[i].Name);
        tickerArray[i] = String(data[i].Ticker);
        categoryArray[i] = String(data[i].Category);
        AUMArray[i] = Number(data[i].AUM);
        MERArray[i] = Number(data[i].MER);
        oneYearArray[i] = Number(data[i].OneYear);
        fiveYearArray[i] = Number(data[i].FiveYear);
        tenYearArray[i] = Number(data[i].TenYear);
        inceptionArray[i] = Number(data[i].Inception);
        yieldArray[i] = Number(data[i].Yield);
        startDateArray[i] = String(data[i].StartDate);
    }

    dataLength = tickerArray.length;

    console.log("Number of data points: "+dataLength);
    console.log(fundNameArray);
    console.log(tickerArray);
    console.log(AUMArray);
    console.log(MERArray);
    console.log(oneYearArray);
    console.log(startDateArray);

    fillTable();
    runCharts();

}


function runCharts(){

    var totalAUM = 0;
    var fundCount = 0;

    var introPara = document.getElementById("introPara");

    var providerPieData = [];
    var providerPieLabels = ["iShares","BMO","Vanguard","RBC","Horizons","Invesco"];
    var iSharesAUM = 0;
    var BMOAUM = 0;
    var vanguardAUM = 0;
    var RBCAUM = 0;
    var horizonsAUM = 0;
    var invescoAUM = 0;

    var assetCategoryPieData = [];
    var assetCategoryPieLabels = ["Equity","Fixed Income","Asset Allocation","Commodities","Alternative","Currency"];
    var equityAUM = 0;
    var fixedIncomeAUM = 0;
    var AAAUM = 0;
    var commoditiesAUM = 0;
    var alternativeAUM = 0;
    var currencyAUM = 0;

    var MERDistributionLabels = ["0% to 0.1%","0.1% to 0.2%","0.2% to 0.3%","0.3% to 0.4%","0.4% to 0.5%","0.5% to 0.6%","0.6% to 0.7%","0.7% to 0.8%","0.8% to 0.9%","0.9% to 1.0%","1.0% to 1.1%","1.1% to 1.2%","1.2% to 1.3%"];
    var MERDistributionData = [];
    var MERCount1 = 0;
    var MERCount2 = 0;
    var MERCount3 = 0;
    var MERCount4 = 0;
    var MERCount5 = 0;
    var MERCount6 = 0;
    var MERCount7 = 0;
    var MERCount8 = 0;
    var MERCount9 = 0;
    var MERCount10 = 0;
    var MERCount11 = 0;
    var MERCount12 = 0;
    var MERCount13 = 0;

    var oneYearCount = 0;
    var oneYearDistributionLabels = ["<-20%","-20% to -15%","-15% to -10%","-10% to -5%","-5% to 0%","0% to 5%","5% to 10%","10% to 15%","15% to 20%",">20%"];
    var oneYearDistributionData = [];

    var oneYear1 = 0;
    var oneYear2 = 0;
    var oneYear3 = 0;
    var oneYear4 = 0;
    var oneYear5 = 0;
    var oneYear6 = 0;
    var oneYear7 = 0;
    var oneYear8 = 0;
    var oneYear9 = 0;
    var oneYear10 = 0;

    var fiveYearCount = 0;
    var fiveYearDistributionLabels = ["-20% to -15%","-15% to -10%","-10% to -5%","-5% to 0%","0% to 5%","5% to 10%","10% to 15%","15% to 20%"];
    var fiveYearDistributionData = [];

    var fiveYear1 = 0;
    var fiveYear2 = 0;
    var fiveYear3 = 0;
    var fiveYear4 = 0;
    var fiveYear5 = 0;
    var fiveYear6 = 0;
    var fiveYear7 = 0;
    var fiveYear8 = 0;


    for(i=0;i<tickerArray.length;i++){
        totalAUM += AUMArray[i];
        fundCount++;

        //sum up AUM by fund provider
        if(providerArray[i] == "iShares"){
            iSharesAUM += AUMArray[i];
        } else if(providerArray[i] == "BMO"){
            BMOAUM += AUMArray[i];
        } else if(providerArray[i] == "Vanguard"){
            vanguardAUM += AUMArray[i];
        } else if(providerArray[i] == "RBC"){
            RBCAUM += AUMArray[i];
        } else if(providerArray[i] == "Horizons"){
            horizonsAUM += AUMArray[i];
        } else if(providerArray[i] == "Invesco"){
            invescoAUM += AUMArray[i];
        }

        //sum up AUM by asset category
        if(categoryArray[i] == "Equity"){
            equityAUM += AUMArray[i];
        } else if(categoryArray[i] == "Fixed Income"){
            fixedIncomeAUM += AUMArray[i];
        } else if(categoryArray[i] == "Asset Allocation"){
            AAAUM += AUMArray[i];
        } else if(categoryArray[i] == "Commodities"){
            commoditiesAUM += AUMArray[i];
        } else if(categoryArray[i] == "Alternative"){
            alternativeAUM += AUMArray[i];
        } else if(categoryArray[i] == "Currency"){
            currencyAUM += AUMArray[i];
        }

        //count MER data for distribution chart
        if(MERArray[i]>=0 && MERArray[i]<=0.001){
            MERCount1++;
        } else if(MERArray[i]>0.001 && MERArray[i]<=0.002){
            MERCount2++;
        } else if(MERArray[i]>0.002 && MERArray[i]<=0.003){
            MERCount3++;
        } else if(MERArray[i]>0.003 && MERArray[i]<=0.004){
            MERCount4++;
        } else if(MERArray[i]>0.004 && MERArray[i]<=0.005){
            MERCount5++;
        } else if(MERArray[i]>0.005 && MERArray[i]<=0.006){
            MERCount6++;
        } else if(MERArray[i]>0.006 && MERArray[i]<=0.007){
            MERCount7++;
        } else if(MERArray[i]>0.007 && MERArray[i]<=0.008){
            MERCount8++;
        } else if(MERArray[i]>0.008 && MERArray[i]<=0.009){
            MERCount9++;
        } else if(MERArray[i]>0.009 && MERArray[i]<=0.010){
            MERCount10++;
        } else if(MERArray[i]>0.010 && MERArray[i]<=0.011){
            MERCount11++;
        } else if(MERArray[i]>0.011 && MERArray[i]<=0.012){
            MERCount12++;
        } else if(MERArray[i]>0.012 && MERArray[i]<=0.013){
            MERCount13++;
        }

        //generate one year return distribution
        if(oneYearArray[i]<=-0.2){
            oneYear1++;
            oneYearCount++;
        } else if(oneYearArray[i]>-0.2 && oneYearArray[i]<=-0.15){
            oneYear2++;
            oneYearCount++;
        } else if(oneYearArray[i]>-0.15 && oneYearArray[i]<=-0.10){
            oneYear3++;
            oneYearCount++;
        } else if(oneYearArray[i]>-0.10 && oneYearArray[i]<=-0.05){
            oneYear4++;
            oneYearCount++;
        } else if(oneYearArray[i]>-0.05 && oneYearArray[i]<=0.00){
            oneYear5++;
            oneYearCount++;
        } else if(oneYearArray[i]>0.00 && oneYearArray[i]<=0.05){
            oneYear6++;
            oneYearCount++;
        } else if(oneYearArray[i]>0.05 && oneYearArray[i]<=0.1){
            oneYear7++;
            oneYearCount++;
        } else if(oneYearArray[i]>0.1 && oneYearArray[i]<=0.15){
            oneYear8++;
            oneYearCount++;
        } else if(oneYearArray[i]>0.15 && oneYearArray[i]<=0.2){
            oneYear9++;
            oneYearCount++;
        } else if(oneYearArray[i]>0.2){
            oneYear10++;
            oneYearCount++;
        }

        //generate five year return distribution
        if(fiveYearArray[i]>=-0.2 && fiveYearArray[i]<=-0.15){
            fiveYear1++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>-0.15 && fiveYearArray[i]<=-0.10){
            fiveYear2++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>-0.10 && fiveYearArray[i]<=-0.05){
            fiveYear3++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>-0.05 && fiveYearArray[i]<=0){
            fiveYear4++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>0 && fiveYearArray[i]<=0.05){
            fiveYear5++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>0.05 && fiveYearArray[i]<=0.1){
            fiveYear6++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>0.1 && fiveYearArray[i]<=0.15){
            fiveYear7++;
            fiveYearCount++;
        } else if(fiveYearArray[i]>0.15 && fiveYearArray[i]<=0.2){
            fiveYear8++;
            fiveYearCount++;
        }
    }

    introPara.innerHTML = "Currently, this database is tracking <span id='fundCountSpan'>"+fundCount+"</span> funds, with combined assets under management of <span id='totalAUMSpan'>$"+(Math.round((totalAUM/100))/10).toLocaleString()+"B</span>.";

    console.log("iShares: "+iSharesAUM+", BMO: "+BMOAUM+", Vanguard: "+vanguardAUM+", RBC: "+RBCAUM+", Horizons: "+horizonsAUM+", Invesco: "+invescoAUM);
    providerPieData = [Math.round(iSharesAUM/100)/10,Math.round(BMOAUM/100)/10,Math.round(vanguardAUM/100)/10,Math.round(RBCAUM/100)/10,Math.round(horizonsAUM/100)/10,Math.round(invescoAUM/100)/10,];
    console.log(providerPieData);

    assetCategoryPieData = [Math.round(equityAUM/100)/10,Math.round(fixedIncomeAUM/100)/10,Math.round(AAAUM/100)/10,Math.round(commoditiesAUM/100)/10,Math.round(alternativeAUM/100)/10,Math.round(currencyAUM/100)/10,];
    console.log(assetCategoryPieData);

    MERDistributionData = [MERCount1,MERCount2,MERCount3,MERCount4,MERCount5,MERCount6,MERCount7,MERCount8,MERCount9,MERCount10,MERCount11,MERCount12,MERCount13];
    console.log(MERDistributionData);

    oneYearDistributionData = [oneYear1,oneYear2,oneYear3,oneYear4,oneYear5,oneYear6,oneYear7,oneYear8,oneYear9,oneYear10];
    console.log(oneYearDistributionData);

    fiveYearDistributionData = [fiveYear1,fiveYear2,fiveYear3,fiveYear4,fiveYear5,fiveYear6,fiveYear7,fiveYear8];
    console.log(fiveYearDistributionData);

    //chart.js chart for AUM pie by provider
    var ctx = document.getElementById('providerPieChart').getContext('2d');
    chart1 = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: providerPieLabels,
            datasets: [{
                backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                ],
                data: providerPieData
            }]
        },

        // Configuration options go here
        options: {

            maintainAspectRatio: false,

            tooltips: {
                
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return '$'+data['datasets'][0]['data'][tooltipItem['index']]+"B";
                    },
                    afterLabel: function(tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / (totalAUM/1000)) * 100)
                        return '(' + percent + '%)';
                    }
                },
            },

            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Assets Under Management (AUM) by Fund Provider",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

        }
    });

    //chart.js chart for AUM pie by asset category
    var ctx2 = document.getElementById('assetCategoryPieChart').getContext('2d');
    chart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: assetCategoryPieLabels,
            datasets: [{
                backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                ],
                data: assetCategoryPieData
            }]
        },

        // Configuration options go here
        options: {

            maintainAspectRatio: false,

            tooltips: {
                
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return '$'+data['datasets'][0]['data'][tooltipItem['index']]+"B";
                    },
                    afterLabel: function(tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / (totalAUM/1000)) * 100)
                        return '(' + percent + '%)';
                    }
                },
            },

            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "AUM by Asset Class",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },

        }
    });


    //chart.js chart for one year return distribution
    var ctx3 = document.getElementById('oneYearDistributionChart').getContext('2d');

    chart3 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: oneYearDistributionLabels,
            datasets: [
                {
                    label: "# of Index Funds",
                    data: oneYearDistributionData,
                    backgroundColor: ["#e74c3c","#e74c3c","#e74c3c","#e74c3c","#e74c3c","#2ecc71","#2ecc71","#2ecc71","#2ecc71","#2ecc71"]
                },       
            ]
        },
    
        options: {
        
            maintainAspectRatio: false,
        
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']]+ " funds";
                    },
                    afterLabel: function(tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / (oneYearCount)) * 100)
                        return '(' + percent + '%)';
                    }
                },
            },
            
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "# of Index Funds",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    ticks: {

                        fontColor: "rgb(56,56,56)",
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],
        
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 90, 
                    },
        
                    scaleLabel: {
                        display: true,
                        labelString: "1-YR Total Return",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },
        
            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },
        
            title: {
                display: true,
                text: "Distribution of 1-YR Total Returns",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },
        }
        
    });

    //chart.js chart for five year return distribution
    var ctx4 = document.getElementById('fiveYearDistributionChart').getContext('2d');

    chart4 = new Chart(ctx4, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: fiveYearDistributionLabels,
            datasets: [
                {
                    label: "# of Index Funds",
                    data: fiveYearDistributionData,
                    backgroundColor: ["#e74c3c","#e74c3c","#e74c3c","#e74c3c","#2ecc71","#2ecc71","#2ecc71","#2ecc71"]
                },                
            ]
        },
    
        options: {
        
            maintainAspectRatio: false,
        
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']]+ " funds";
                    },
                    afterLabel: function(tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / (fiveYearCount)) * 100)
                        return '(' + percent + '%)';
                    }
                },
            },
            
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "# of Index Funds",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    ticks: {

                        fontColor: "rgb(56,56,56)",
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],
        
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 90, 
                    },
        
                    scaleLabel: {
                        display: true,
                        labelString: "5-YR Total Return (Annualized)",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },
        
            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },
        
            title: {
                display: true,
                text: "Distribution of 5-YR Total Returns (Annualized)",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },
        }
        
    });
    



    //chart.js chart for MER distribution
    var ctx5 = document.getElementById('MERDistributionChart').getContext('2d');

    chart5 = new Chart(ctx5, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: MERDistributionLabels,
            datasets: [
                {
                    label: "# of Index Funds",
                    data: MERDistributionData,
                    backgroundColor: "#9b59b6", 
                },                
            ]
        },
    
        options: {
        
            maintainAspectRatio: false,
        
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return data['datasets'][0]['data'][tooltipItem['index']]+ " funds";
                    },
                    afterLabel: function(tooltipItem, data) {
                        var dataset = data['datasets'][0];
                        var percent = Math.round((dataset['data'][tooltipItem['index']] / (fundCount)) * 100)
                        return '(' + percent + '%)';
                    }
                },
            },
            
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "# of Index Funds",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    ticks: {

                        fontColor: "rgb(56,56,56)",
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],
        
                xAxes: [{
                    ticks: {
                        maxRotation: 90,
                        minRotation: 90, 
                    },
        
                    scaleLabel: {
                        display: true,
                        labelString: "Management Expense Ratio",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },
        
                    gridLines: {
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },
        
            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },
        
            title: {
                display: true,
                text: "Management Expense Ratio (MER) Distribution",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },
        }
        
    });
}


function fillTable(){

    for(i=0; i<dataLength; i++){
        console.log("add new table row");
        var tableRow = document.createElement('tr');
        
        tableRow.setAttribute('id','row'+(i+1));
        mainTable.appendChild(tableRow);

        for(j=0; j<numberCol; j++){

            console.log("add new table data");

            var tableCell = document.createElement('td');
            tableCell.classList.add("tableCell");
            tableCell.setAttribute('id','row'+(i+1)+'col'+(j+1));
            tableRow.appendChild(tableCell);

            if(j==0){
                tableCell.innerHTML = providerArray[i];
            }

            if(j==1){
                tableCell.innerHTML = fundNameArray[i];              
            }

            if(j==2){
                tableCell.innerHTML = tickerArray[i];                            
            }

            if(j==3){
                tableCell.innerHTML = categoryArray[i];                                            
            }

            if(j==4){
                tableCell.innerHTML = (Math.round(AUMArray[i]*10)/10).toFixed(1);
            }

            if(j==5){
                if(isNaN(MERArray[i])){
                    tableCell.innerHTML = "n/a";                  
                } else{
                    tableCell.innerHTML = (Math.round((MERArray[i]*100)*100)/100).toFixed(2);
                }
            }

            if(j==6){
                if(isNaN(oneYearArray[i])){
                    tableCell.innerHTML = "";
                }
                else{
                    tableCell.innerHTML = (Math.round((oneYearArray[i]*100)*100)/100).toFixed(1);
                }               
            }

            if(j==7){
                if(isNaN(fiveYearArray[i])){
                    tableCell.innerHTML = "";
                }
                else{
                    tableCell.innerHTML = (Math.round((fiveYearArray[i]*100)*100)/100).toFixed(1);
                }          
            }

            if(j==8){
                if(isNaN(tenYearArray[i])){
                    tableCell.innerHTML = "";
                }
                else{
                    tableCell.innerHTML = (Math.round((tenYearArray[i]*100)*100)/100).toFixed(1);
                } 
            }

            if(j==9){
                if(isNaN(inceptionArray[i])){
                    tableCell.innerHTML = "";
                }
                else{
                    tableCell.innerHTML = (Math.round((inceptionArray[i]*100)*100)/100).toFixed(1);
                }             
            }

            if(j==10){
                if(isNaN(yieldArray[i])){
                    tableCell.innerHTML = "";
                }
                else{
                    tableCell.innerHTML = (Math.round((yieldArray[i]*100)*100)/100).toFixed(2);
                }             
            }

            if(j==11){
                tableCell.innerHTML = startDateArray[i];          
            }
        }

    }

    //enable table sorting

    const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

    // do the work...
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr) );

    })));

    //when page loads, default to sort by AUM (high to low)
    const table = header5.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(header5.parentNode.children).indexOf(header5), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );

    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(header5.parentNode.children).indexOf(header5), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );

    arrow5.classList.add("activeArrow");

    setFooterWidth();
}

function sortingArrows(){

    var counter1 = 0;
    var counter2 = 0;
    var counter3 = 0;
    var counter4 = 0;
    var counter5 = 0;
    var counter6 = 0;
    var counter7 = 0;
    var counter8 = 0;
    var counter9 = 0;
    var counter10 = 0;
    var counter11 = 0;
    var counter12 = 0;

    header1.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow1.classList.add("activeArrow");
    }));

    
    header2.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow2.classList.add("activeArrow");
    }));
    
    header3.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow3.classList.add("activeArrow");
    }));
    
    header4.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow4.classList.add("activeArrow");
    }));
    
    header5.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow5.classList.add("activeArrow");
    }));

    header6.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow6.classList.add("activeArrow");
    }));

    header7.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow7.classList.add("activeArrow");
    }));
    
    header8.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow8.classList.add("activeArrow");
    }));
    
    header9.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow9.classList.add("activeArrow");
    }));
    
    header10.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow10.classList.add("activeArrow");
    }));
    
    header11.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow11.classList.add("activeArrow");
    }));
    
    header12.addEventListener('click', (() => {
        arrow1.classList.remove("activeArrow");
        arrow2.classList.remove("activeArrow");
        arrow3.classList.remove("activeArrow");
        arrow4.classList.remove("activeArrow");
        arrow5.classList.remove("activeArrow");
        arrow6.classList.remove("activeArrow");
        arrow7.classList.remove("activeArrow");
        arrow8.classList.remove("activeArrow");
        arrow9.classList.remove("activeArrow");
        arrow10.classList.remove("activeArrow");
        arrow11.classList.remove("activeArrow");
        arrow12.classList.remove("activeArrow");

        arrow12.classList.add("activeArrow");
    }));
}

function setFooterWidth(){

    var minWidth1 = 0;
    var minWidth2 = 0;
    var minWidth3 = 0;
    var minWidth4 = 0;
    var minWidth5 = 0;
    var minWidth6 = 0;
    var minWidth7 = 0;
    var minWidth8 = 0;
    var minWidth9 = 0;
    var minWidth10 = 0;
    var minWidth11 = 0;
    var minWidth12 = 0;

    var width1 = 0;
    var width2 = 0;
    var width3 = 0;
    var width4 = 0;
    var width5 = 0;
    var width6 = 0;
    var width7 = 0;
    var width8 = 0;
    var width9 = 0;
    var width10 = 0;
    var width11 = 0;
    var width12 = 0;

    minWidth1 = "min-width:"+(header1.offsetWidth-1)+"px";
    minWidth2 = "min-width:"+(header2.offsetWidth-1)+"px";
    minWidth3 = "min-width:"+(header3.offsetWidth-1)+"px";
    minWidth4 = "min-width:"+(header4.offsetWidth-1)+"px";
    minWidth5 = "min-width:"+(header5.offsetWidth-1)+"px";
    minWidth6 = "min-width:"+(header6.offsetWidth-1)+"px";
    minWidth7 = "min-width:"+(header7.offsetWidth-1)+"px";
    minWidth8 = "min-width:"+(header8.offsetWidth-1)+"px";
    minWidth9 = "min-width:"+(header9.offsetWidth-1)+"px";
    minWidth10 = "min-width:"+(header10.offsetWidth-1)+"px";
    minWidth11 = "min-width:"+(header11.offsetWidth-1)+"px";
    minWidth12 = "min-width:"+(header12.offsetWidth-1)+"px";

    width1 = "width:"+header1.offsetWidth+"px";
    width2 = "width:"+header2.offsetWidth+"px";
    width3 = "width:"+header3.offsetWidth+"px";
    width4 = "width:"+header4.offsetWidth+"px";
    width5 = "width:"+header5.offsetWidth+"px";
    width6 = "width:"+header6.offsetWidth+"px";
    width7 = "width:"+header7.offsetWidth+"px";
    width8 = "width:"+header8.offsetWidth+"px";
    width9 = "width:"+header9.offsetWidth+"px";
    width10 = "width:"+header10.offsetWidth+"px";
    width11 = "width:"+header11.offsetWidth+"px";
    width12 = "width:"+header12.offsetWidth+"px";

    var footer1 = document.getElementById("footer1");
    var footer2 = document.getElementById("footer2");
    var footer3 = document.getElementById("footer3");
    var footer4 = document.getElementById("footer4");
    var footer5 = document.getElementById("footer5");
    var footer6 = document.getElementById("footer6");
    var footer7 = document.getElementById("footer7");
    var footer8 = document.getElementById("footer8");
    var footer9 = document.getElementById("footer9");
    var footer10 = document.getElementById("footer10");
    var footer11 = document.getElementById("footer11");
    var footer12 = document.getElementById("footer12");

    /*
    footer1.setAttribute("style",width1);
    footer2.setAttribute("style",width2);
    footer3.setAttribute("style",width3);
    footer4.setAttribute("style",width4);
    footer5.setAttribute("style",width5);
    footer6.setAttribute("style",width6);
    footer7.setAttribute("style",width7);
    footer8.setAttribute("style",width8);
    footer9.setAttribute("style",width9);
    footer10.setAttribute("style",width10);
    footer11.setAttribute("style",width11);
    footer12.setAttribute("style",width12);
    */

    footer1.setAttribute("style",minWidth1);
    footer2.setAttribute("style",minWidth2);
    footer3.setAttribute("style",minWidth3);
    footer4.setAttribute("style",minWidth4);
    footer5.setAttribute("style",minWidth5);
    footer6.setAttribute("style",minWidth6);
    footer7.setAttribute("style",minWidth7);
    footer8.setAttribute("style",minWidth8);
    footer9.setAttribute("style",minWidth9);
    footer10.setAttribute("style",minWidth10);
    footer11.setAttribute("style",minWidth11);
    footer12.setAttribute("style",minWidth12);

    console.log("Column 1 width: "+width1);
    console.log("Column 2 width: "+width2);

    console.log("Footer 2 width:"+footer2.offsetWidth);

}

function OnScroll(div){
    var bottomTable = document.getElementById("bottomTable");
    bottomTable.scrollLeft = div.scrollLeft;
}

function OnScroll2(div){
    var mainTable = document.getElementById("mainTable");
    mainTable.scrollLeft = div.scrollLeft;
}