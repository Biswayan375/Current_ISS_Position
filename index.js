// For maps, leaflet.js library has been used and for tiles on it, mapbox is used whose username is 'nil200701' and password is saved in chrome and what are you looking at this information is for the dump code writer who cannot remember a thing on his own.
$('div#moreShitTalk').hide();
$('p#knowMore').click(function() {
    $('div#moreShitTalk').toggle('slow');
});

var myMap, iss;

let htmlString = `
    <p style='text-align: center'>Loading...</p>
`;
$('div.container').html(htmlString);
setInterval(queryData, 1000);

function queryData() {
    let url = 'http://api.open-notify.org/iss-now.json?callback=?';
    $.getJSON(url).done(function(data){
        gotData(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        gotError(textStatus);
    });
}

function gotData(data) {
    let lati = data.iss_position.latitude,
    longi = data.iss_position.longitude;

    if(!myMap){
        createMap(lati, longi);
    }

    let htmlString = `
        <p style='text-align: center'><b style='color: red'>ISS Position</b> <font color='green' style='font-weight: bold'>Longitude:</font> <font color=blue>${longi}</font> <font color='green' style='font-weight: bold'>Latitude:</font> <font color=blue>${lati}</font></p>
    `;
    $('div.container').html(htmlString);

    iss.setLatLng([lati, longi]);
    // myMap.setView([lati, longi], myMap._zoom);
}

function gotError(error) {
    let htmlString = `
        <p>Please check your connection!</p>
    `;
    $('div.container').html(htmlString);
}

function createMap(lati, long){
    myMap = L.map('map').setView([lati, long], 13);
    // console.log(myMap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{styleId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 4,
    minZoom: 2,
    styleId: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmlsMjAwNzAxIiwiYSI6ImNrc3R5MG90djAzMHIydmxnZ255OHN1NnEifQ._JWQAf-ujImsO5JfCDFu7g'
    }).addTo(myMap);

    iss = L.circle([lati, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000000
    }).addTo(myMap);

    // Event Handling
    let shitTalk = '<b>Believe me</b>, I don\'t even know how much ground the ISS covers from that high in the space. It is just an arbitrary circle although the <b>coordinates are correct</b> according to the data from the <a href="open-notify.org">API</a>.';
    if(iss) iss.bindPopup(shitTalk);
}