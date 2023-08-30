fetch('https://api.agromonitoring.com/agro/1.0/weather?lat=44.319305&lon=23.800678&appid=f39712e654bf3acf782c64b78437f540')
    .then((data) => {
        return data.json();
    }).then((completeData) => {
        console.log(completeData.weather);
        console.log(completeData.main);
        console.log(completeData.main.humidity);

        let tableData = "";

        let valNum = parseFloat(completeData.main.temp);
        let temp = (valNum - 273.15).toFixed(1);

        completeData.weather.map((values) => {
            tableData =
                `<tr>
            <td>${values.main}</td>
            <td>${values.description}</td>
            <td>${temp}°C</td>
            <td>${completeData.main.humidity}%</td>
            </tr>`;
        });

        document.getElementById('table_body').innerHTML = tableData;



    })

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'Aq1cH-6S5LPVeMtUB5ptNesziKfdnk0W6j6pZ5zpSWKYM9BgYTFBDSDvMu68T9Lh',

        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 10
    });

    //Request the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        //Add a pushpin at the user's location.
        var pushpin = new Microsoft.Maps.Pushpin(loc, {
            icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
            title: 'Current Location',
        });

        map.entities.push(pushpin);
        //Center the map on the user's location.
        map.setView({ center: loc, zoom: 15 });
    });
}
