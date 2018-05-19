#####PROJECT :--SHOWING SOME LOCATIONS WE WOULD LIKE TO GET INFORMATION

#####HOSTED AT :- https://gangeshraj.github.io/neighbourhood/

#####LANGUAGES USED
    1 Javascript
    2 Html
    3 Css

#####ORGANISATIONAL FRAMEWORK USED
    1 Knockout.js

#####LIBRARY USED
    1.jQuery(JAVSCRIPT OBJECT)
    2 BOOTSTRAP

#####API USED
    1.Google Map Api for javascript
    2.Foursquare Api

#####Files In the Project Files
    MAIN DIRECTORY-->
                1.CSS folder->index.css
                2 Js->index.js,jquery-3.2.1.js,knockout-3.4.2.js
                3 index.html
                4 Readme.md

#####TECHNOLOGIES main PURPOSE
    KNOCKOUT.js
        index.html Document Object Model is bound using knockout organsational framework
        and it is manipulated as the updates happen automatically using knockout observables
        The main change reflected in view model

    JQUERY LIBRARY
        it uses $.getJSON() method to fetch places specification in json format using
        foursquare api and also check error if not gets the data from foursquare
        Data is fetched to show the markers specifications

    GOOGLE MAP API
        it loads the google map and markers

    FOURSQUARE API
        fetches the data on the basis of places shown on the markers which are reflected

    BOOTSTRAP
        it makes the page responsive using its classes

#####HOW TO USE THIS APP?
        This app can easily be used in following steps:-
        STEP 1 we just need to host the whole MAIN DIRECTORY in our server

        STEP 2 We need to find the index.html file at bottom we will find
        <script async defer src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key="PUT YOUR GOOGLE API KEY HERE AND REMOVE DOUBLE QUOTES"v=3&callback=initMap" onerror="mapnotloaded()">
        edit the line and insert the google api javascript key for map

        STEP 3 We need to go in the js directory into it find index.js
        var foursquareapi="https://api.foursquare.com/v2/venues/search?client_id="PUT YOUR CLIENT ID HERE AND REMOVE DOUBLE QUOTES"&client_secret="PUT YOUR CLIENT SECRET CODE HERE AND REMOVE DOUBLE QUOTES"&ll="+lat+","+lon+"&query="+name+"&v=20171016&m=foursquare";
        Edit the line and insert your foursquare api client key and client secret in the specified place

        STEP 4 in index.js find var places ko.observableArray and put the places you want to get the info about in it

        step 5 Now you can have the server mainly using index.html file which is the application file the main file hosted as the application an user interface .
        To use this application after above the steps are completed we need to run index.html on any internet browser like chrome ,mozilla etc;
        and we can use it to find the places and information about it using the foursquare api









