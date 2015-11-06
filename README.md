# Animl

<http://www.animl.herokuapp.com/>

### Basic Info
Animl is a full-stack application that allows users to search for any animal they wish to see and populates a map with all confirmed sightings of said animal in their county as reported by the USGS and other users.   

###Technologies Used
* Express / NodeJS
* HTML / CSS / JavaScript
* BootStrap 3
* Animal sighting data pulled from the [BISON API](http://bison.usgs.ornl.gov/).
* Maps generated using [Google Maps API](https://developers.google.com/maps/?hl=en)
* Zip codes converted to county FIPS codes using the [ZIP2FIPS](https://github.com/bgruber/zip2fips) project.
* Latitude and longitude converted to county FIPS codes using the [Census Block Conversions API](https://www.fcc.gov/developers/census-block-conversions-api).

###Known Issues
* The Census Block Conversions API does not recognize locations dropped in large bodies of water. If, for example, a user drops a pin for an orca sighting in Puget Sound, it does not show up as a sighting in King County.
* The Zip2FIPS project has most, but not all, zip codes included.  Some users cannot retrieve any sightings at all.
*The BISON API is very particular about the names of animals. "Crow", for example, returns no results in King County Washington, while "American Crow" returns over one hundred. The BISON API allows for searching by scientific name, but I could not find an animal name conversion API.  
* Excess spaces in the search fields will cause no results to be returned.

###Wishlist
* Geolocation so the sightings map will center on the users location instead of downtown Seattle.
* Allow users to add most wanted animals to a top 10 list, update each animal with a wanted score based on ranking by all users.  
* Allow login via Facebook, Twitter, etc.

###Contributors
Joe Rehfuss