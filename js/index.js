var map;//variable for map initialisation
var inputarea="";//contains the input given ininput area
var infowindowsObject=[];

//places array is the array which has the locations shoen it wont be modified
var places=ko.observableArray(["Toronto","New York","Washington","Las Vegas","Rio De Janiero","Mexico City"]);

//this is the main ViewModel where all html bindings obseravles are written
var ViewModel=function(){
     this.searchTerm= ko.observable("");//gets the input value from input area

     //it is the list which should contain the input given assubstring for showing on page
     this.list=ko.observableArray();

     //this function actually filters the locations on user input by returning list()
     //which should contain the input given assubstring for showing on page
     this.results = ko.computed( function() {
     this.list.splice(0,this.list().length);//each time when enters this method the list should be deleted
     //completely else the last time changes will be also appended in last input taken by user
     var i=0;//a loop index
          while(i<places().length){
               if (places()[i].toLowerCase().includes( this.searchTerm().toLowerCase()))
               {
                    this.list.push(places()[i]);
                    i+=1;
               }
               else
               {
                    i+=1;
               }
          }
          return this.list();//this returns to the binding so as to create modified=d list of table in DOM
 }, this);

this.classpresent=ko.observable(false);//if its false than map is small the side pan is not gone
//else if its true make it large using the purecomputedfunctions by functons like ifclasspresentone,ifclasspresenttwo,shouldShowMessage

//contains sign which is bound to the button to close and open the side space for map
this.changesign=ko.observable("<<<<<");

this.clickeffect=function() {//alternate the value of classpresent() from true to false and false to true
     if (this.classpresent()===true)
          {
               this.changesign("<<<<<");
               //this.classpresent(false);
               document.getElementById('map').classList.toggle('map-closed');
               document.getElementById('findloc').classList.toggle('closed');
               document.getElementById('blacksection').classList.toggle('blacksection-closed')
          }
     else
          {
               this.changesign(">>>>>");
               //this.classpresent(true);
               document.getElementById('map').classList.toggle('map-closed');
               document.getElementById('findloc').classList.toggle('closed');
               document.getElementById('blacksection').classList.toggle('blacksection-closed');

          }
};

//calling callcreatemarkers on input changeto make markers on input change
this.searching=function(){
    inputarea=this.searchTerm();//searchterm in input text area
    callcreatemarkers();
};


this.listclick=function(data,event)//calling listclick function to create marker and animation on the clicked place showing on the page filtered list
{
     callcreatemarkers.listclick(data);//passing the data
}


//according the value of classpresent() add or remove class which is defined by bootstrap
//gives more or less space to map
this.ifclasspresentone = ko.pureComputed(function() {
     return this.classpresent()? "" : "";
}, this);

//according the value of classpresent() add or remove class which is defined by bootstrap
//gives more or less space to map
this.ifclasspresenttwo = ko.pureComputed(function() {
     return this.classpresent()? "" : "";
}, this);

//showing and hiding element <span> on the basis of value of classpresent()
this.shouldShowMessage = ko.pureComputed(function() {
     return !this.classpresent();
}, this);


};


var locations=[];//this array is having the locations sent to create markers
var markers=[];//this array is used to have the markers inside
  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
function createMapMarker(placeData) {


     // The next lines save location data from the search result object to local variables
     var lat = placeData.geometry.location.lat();  // latitude from the place service
     var lon = placeData.geometry.location.lng();  // longitude from the place service
     var name = placeData.formatted_address;   // name of the place from the place service
     var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    //pushed in array markers to keep track of markers
     var marker;
     markers.push(marker= new google.maps.Marker({
          map: map,
          position: placeData.geometry.location,
          title: name
     }));

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
     var infoWindow = new google.maps.InfoWindow({
          content: name
     });


      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
     function colorchanging(markerColor) {
          var markerimage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(25, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(25,34));
          return markerimage;
     }

    var newcolor = colorchanging('FFFF24');

    // this is for when marker is clicked
     google.maps.event.addListener(marker, 'click', function() {
     //remembering the context of marker
     var self=this;
     // you will color the map using this color
     this.setIcon(newcolor);
     //animate the marker
     this.setAnimation(google.maps.Animation.DROP);

      //populate the infowindow of marker using third party library fourquare API
     var foursquareapi="https://api.foursquare.com/v2/venues/search?client_id=HLX0UV0CI2SF4XOGHND3EC5RYFMYQCRB3RIXI5XDTWGRIW3Z&client_secret=HGAQI3D3WYRH1BBXJYJAFJW3NTSZCN5RUIMAKWMKG0FLGW4Y&ll="+lat+","+lon+"&query="+name+"&v=20171016&m=foursquare";
     //get json data using Query "$.getJSON"
     $.getJSON(foursquareapi).done(function(json) {
          //data is in json object with a proprty response in it which further contains array values[n]
          const jsonreceived = json.response;
          //content of info window of marker
          var contentofinfowindow="<html><b><h3>"+jsonreceived.venues[0].name+"</h3><p>"+
          jsonreceived.venues[0].location.formattedAddress[0]+"</br>"+jsonreceived.venues[0].location.formattedAddress[1]+"</p></b></html>";

          //create an object of infowindow
          this.Window = new google.maps.InfoWindow({content: this.contentofinfowindow});
          this.Window.setContent(contentofinfowindow);
          this.Window.open(map,self);

     }).fail(function( jqxhr, textStatus, error ) {
          var err = textStatus + ", " + error;
          alert( "Request Failed: " + err );
     });


     });

     // this is where the pin actually gets added to the map.
     // bounds.extend() takes in a map location object
     bounds.extend(new google.maps.LatLng(lat, lon));
     // fit the map to the new marker
     map.fitBounds(bounds);
     // center the map
     map.setCenter(bounds.getCenter());
}

     /*
     callback(results, status) makes sure the search returned results for a location.
     If so, it creates a new map marker for that location.
     */
     function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
               createMapMarker(results[0]);
          }
     }

     /*
     pinPoster(locations) takes in the array of locations created by locationFinder()
     and fires off Google place searches for each location
     */
     function useplaceservice(locations) {
          // creates a Google place search service object. PlacesService does the work of
          // actually searching for location data.
          var service = new google.maps.places.PlacesService(map);
          // Iterates through the array of locations, creates a search object for each location
          locations.forEach(function(place){
               // the search request object
               var request = {
               query: place
               };

          // Actually searches the Google Maps API for location data and runs the callback
          // function with the search results after each search.
               service.textSearch(request, callback);
          });
     }


var callcreatemarkers=function() {//it will be called whenever we change the input in input area except first time it is invoked
     //make markers visibilityfalse
     for(let i=0;i<infowindowsObject.length;++i)//closing infboxes
     {
          infowindowsObject[i].close(map,self);
          //infowindowsObject[i],close();
     }
     infowindowsObject=[];
     for(let i=0;i<markers.length;++i)
          {
               markers[i].setVisible(false);
          }
               //markers[i].setMap(null);
     //if(markers.length>=1)
         // markers.splice(0,markers.length);
     var inputgiven=inputarea.toUpperCase();//giving input given by user to inputgiven

     if(markers.length===0)//if called first time marker doesnt have refrence
         {
         for(let i=0;i<places().length;++i)//using the array places containing all locations
                   {
                   locations.push(places()[i]);
                   }
          //send the locations filtered to use place services and than make markers on that locations
          useplaceservice(locations);
          }
     else
     {
          for(let i=0;i<places().length;++i)//using the array places containing all locations
          {
               if ((places()[i].toUpperCase()).includes(inputgiven))//if input given is inside the places array
                    {
                         markers[i].setVisible(true);//if in filtered show visibility
                    }
          }
     }
     // Sets the boundaries of the map based on pin locations
     window.mapBounds = new google.maps.LatLngBounds();

     //effect on clicking the list shown on page invokes this method it uses the
     callcreatemarkers.listclick=function(data) {
          let j=0;
               for(;j<locations.length;++j){//if td content matches with locations[j] means the marker [j] will have the object to deal with
               if(data.toUpperCase()===locations[j].toUpperCase())
               {
               break;
               }
          }

            // This function takes in a COLOR, and then creates a new marker
           // icon of that color. The icon will be 21 px wide by 34 high, have an origin
           // of 0, 0 and be anchored at 10, 34).
           function colorchanging(markerColor) {
               var markerimage = new google.maps.MarkerImage(
               'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
               '|40|_|%E2%80%A2',
               new google.maps.Size(25, 34),
               new google.maps.Point(0, 0),
               new google.maps.Point(10, 34),
               new google.maps.Size(25,34));
               return markerimage;
           }

     var newcolor = colorchanging('FFFF24');

     //it graps the object marker trapped in markers[j]
     var self=markers[j];
     // you will color the map using this color
     self.setIcon(newcolor);
     //animate the marker
     self.setAnimation(google.maps.Animation.DROP);
     //foursquare api is used
     var foursquareapi="https://api.foursquare.com/v2/venues/search?client_id=HLX0UV0CI2SF4XOGHND3EC5RYFMYQCRB3RIXI5XDTWGRIW3Z&client_secret=HGAQI3D3WYRH1BBXJYJAFJW3NTSZCN5RUIMAKWMKG0FLGW4Y&ll="+self.position.lat()+","+self.position.lng()+"&query="+self.title+"&v=20171016&m=foursquare";
     //get json data using Query "$.getJSON"
     $.getJSON(foursquareapi).done(function(json) {
          //data is in json object with a property response in it which further contains array values[n]
          const jsonreceived = json.response;
          //content of info window of marker
          var contentofinfowindow="<html><b><h3>"+jsonreceived.venues[0].name+"</h3><p>"+
          jsonreceived.venues[0].location.formattedAddress[0]+"</br>"+jsonreceived.venues[0].location.formattedAddress[1]+"</p></b></html>";

          //create an object of infowindow
          this.Window = new google.maps.InfoWindow({content: this.contentofinfowindow});
          this.Window.setContent(contentofinfowindow);
          this.Window.open(map,self);
          infowindowsObject.push(this.Window);


     }).fail(function( jqxhr, textStatus, error ) {//if error
          var err = textStatus + ", " + error;
          alert( "Request Failed: " + err );
          });

     };

};


//map loading
function initMap() {

     // Constructor creates a new map - only center and zoom are required.
     map = new google.maps.Map(document.getElementById('map'), {
     center:{lat: 23.7413549, lng: 79.9980244},
     zoom: 5,
     fullscreenControl: true
     });

     //applying knockout to ViewModel
     ko.applyBindings(new ViewModel());
     //it is called once only when page is loaded as to create markers because callcreatemarkers
     //is called only when the inputsection is changed by user called by oninput
     callcreatemarkers();

}

//invoked only at beginning of page load
function alertuser()
{
     //alert("AFTER EACH INPUT WAIT FOR FEW SECONDS ELSE YOU MIGHT GET THE WRONG RESULTS");
     //alert("BECAUSE LET THE MAP LOAD DONT CHANGE THE INPUT BEFORE MAP LOADS");
}
alertuser();

function mapnotloaded(){
     alert("MAP NOT LOADED");
}

