const API_KEY = 'U8DxoKHvVafyGgZ2Kg7M';

/**
 * This function will start the if the window load
 * @function showBitcoinToday
 */
function init() {
    showBitcoinToday()
}


/**
 * This function load the date of the cours and download the api
 */
async function showBitcoinToday() {
    let today = new Date();//Speichert das aktuelle Datum und die Uhrzeit
    today.setDate(new Date().getDate() - 1);

    let startDate = today.toISOString().split('T')[0];//Speichert die Werte in einem Array und splitet Datum und Uhrzeit an der Stelle mit dem Buchstaben 'T' und
    let endDate = today.toISOString().split('T')[0];//zeigt die 0 Stelle an hier das Datum

    let url = (`https://www.quandl.com/api/v3/datasets/BITFINEX/BTCUSD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
    let response = await fetch(url);
    let responseAsJSON = await response.json();


    let bitcoinToday = document.getElementById('bitcoinToday');
    bitcoinToday.innerHTML = responseAsJSON['dataset']['data'][0][3];;
}



/**
 * This function load the cours and download this from the api
 * @function getDate
 * @function showDayRange(responseAsJSON)
 */
async function loadCourse() {
    getDates();
    let url = (`https://www.quandl.com/api/v3/datasets/BITFINEX/BTCUSD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    showDayRange(responseAsJSON);
}



/**
 * This function load the price of bitcoin
 * @function pushToGraph
 * @param {The parameter is the api in a JSON} responseAsJSON 
 */
function showDayRange(responseAsJSON) {

    let bitcoinPrices = responseAsJSON['dataset']['data'];
    console.log('dayrange', bitcoinPrices);
    pushToGraph(bitcoinPrices);
}



/**
 * This function load the price of bitcoin into the graph
 * @param {The parameter indicates the price of the bitcoin} bitcoinPrices 
 * @function drawChart
 */
function pushToGraph(bitcoinPrices) {
    for (let i = bitcoinPrices.length - 1; i >= 0; i--) {
        const bitcoinPrice = bitcoinPrices[i];
        xLabels.push(bitcoinPrice[0]);
        yPrices.push(bitcoinPrice[3]);
    }
    drawChart();
}



/**
 * This function load the dates
 * @function getStartDate
 * @function getEndDate
 */
function getDates() {
    getStartDate();
    getEndDate();
}



/**
 * This funktion saves the start date 
 * @returns the date which was chosen into input field
 */
function getStartDate() {
    return startDate = document.getElementById('startInput').value;
}



/**
 * This function saves the end date
 * @returns the date which chosen into input field 
 */
function getEndDate() {
    return endDate = document.getElementById('endInput').value;
}


const xLabels = [];
const yPrices = [];

/**
 * This function draw the graph on the website
 */
function drawChart() {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{
                label: 'Bitcoin Cours',
                borderColor: 'rgb(255, 99, 132)',
                data: yPrices,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}