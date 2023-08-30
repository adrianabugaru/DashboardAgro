var map, drawingManager;

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

    Microsoft.Maps.loadModule([], function () {
        
    });

    Microsoft.Maps.loadModule(['Microsoft.Maps.DrawingTools', 'Microsoft.Maps.AutoSuggest', 'Microsoft.Maps.Search'], function () {
        var tools = new Microsoft.Maps.DrawingTools(map);
        tools.showDrawingManager(function (manager) {
            drawingManager = manager;

            var da = Microsoft.Maps.DrawingTools.DrawingBarAction;
            manager.setOptions({
                drawingBarActions: da.polyline | da.polygon | da.erase,
                fillColor: 'rgba(255, 0, 0, 0.5)'
            });
           
        });

        var manager = new Microsoft.Maps.AutosuggestManager({ map: map });
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', suggestionSelected);

        searchManager = new Microsoft.Maps.Search.SearchManager(map);
    });
}

function getShapes() {
    //var shapes = manager.getPrimitives();
    var shapes = drawingManager.getPrimitives();
    if (shapes && shapes.length > 0) {
        /*alert('Retrieved ' + shapes.length + ' from the drawing manager.');*/

        //Get the locations of the polygon.
        var locations = [];
        for (i = 0; i < shapes.length; i++) {
            locations.push(shapes[i].getLocations());

            document.getElementById('location').innerHTML =
                '<b>Location:</b> <br>' + locations[i]; '<br>'
        }

    } else {
        alert('No shapes in the drawing manager.');
    }

}


function suggestionSelected(result) {
    //Remove previously results from the map.
    map.entities.clear();

    //Show the suggestion as a pushpin and center map over it.
    var pin = new Microsoft.Maps.Pushpin(result.location);
    map.entities.push(pin);

    map.setView({ bounds: result.bestView });

    document.getElementById('output').innerHTML = 'Selection:<br/>' + result.name;
}

function geocode() {
    //Remove previously results from the map.
    map.entities.clear();

    //Get the users query and geocode it.
    var query = document.getElementById('searchBox').value;

    var searchRequest = {
        where: query,
        callback: function (r) {
            if (r && r.results && r.results.length > 0) {
                var pin, pins = [], locs = [], output = 'Results:<br/>';

                //Add a pushpin for each result to the map and create a list to display.
                for (var i = 0; i < r.results.length; i++) {
                    //Create a pushpin for each result.
                    pin = new Microsoft.Maps.Pushpin(r.results[i].location, {

                        text: i + ''

                    });

                    pins.push(pin);
                    locs.push(r.results[i].location);

                    output += i + ') ' + r.results[i].name + '<br/>';
                }

                //Add the pins to the map
                map.entities.push(pins);

                //Display list of results
                document.getElementById('output').innerHTML = output;

                //Determine a bounding box to best view the results.
                var bounds;

                if (r.results.length == 1) {
                    bounds = r.results[0].bestView;
                } else {
                    //Use the locations from the results to calculate a bounding box.
                    bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
                }

                map.setView({ bounds: bounds, padding: 30 });
            }
        },
        errorCallback: function (e) {
            document.getElementById('output').innerHTML = "No results found.";
        }
    };

    //Make the geocode request.
    searchManager.geocode(searchRequest);
}

function SaveLocation() {
    let loc = [];

    var shapes = drawingManager.getPrimitives();
    if (shapes && shapes.length > 0) {
        for (i = 0; i < shapes.length; i++) {
            loc.push(shapes[i].getLocations());
        }
    }
    else {
        alert('No shapes in the drawing manager.');
    }
    console.log(loc);
    let formData = {
        name: $("#name").val(),
        locations: JSON.stringify(loc)
    }
    console.log(formData);

    jQuery.ajaxSettings.traditional = true;

    $.ajax({
        url: "/Boards/SaveLocation",
        type: "POST",
        data: formData,
    });
}