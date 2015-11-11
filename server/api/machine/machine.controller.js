'use strict';

var _ = require('lodash');
var grid = require('turf-grid'),
destination = require('turf-destination'),
point = require('turf-point'),
extent = require('turf-extent'),
featureCollection = require('turf-featurecollection'),
polylineDecode = require('polyline').decode;
var request = require('request');
var OSRM = require('osrm');
var network =  __dirname + "/../../../data/san-francisco-bay_california.osrm" ;
var osrm = new OSRM(network); 
var config = require(__dirname + '/../../config/local.env.js');
var EdmundsClient = require('node-edmunds-api');
var client = new EdmundsClient({ apiKey: config.EDMOUND_KEY });

/**
*
* This is all setup for searching the space and calculating the travelcosts
* !! consider moving to seperate module on refactor !!!
*
*/

var getPolygons = function (center, time, resolution, network, carData , maxCost, done) {

  // compute bbox
  if(!time){
    time = 3000;
  }
  var centerPt = point([center[0], center[1]]);
  var spokes = featureCollection([]);

  // bbox should go out 1.4 miles in each direction for each minute
  // this will account for a driver going a bit above the max safe speed

  var miles = (time/60)/1.4; // assume 70mph max speed

  spokes.features.push(destination(centerPt, miles, 180, 'miles'));
  spokes.features.push(destination(centerPt, miles, 0, 'miles'));
  spokes.features.push(destination(centerPt, miles, 90, 'miles'));
  spokes.features.push(destination(centerPt, miles, -90, 'miles'));

  var bbox = extent(spokes);
  //compute destination grid of targets based on bounds determined by given lat lng and res
  var targets = grid(bbox, resolution);
  var routes = featureCollection([]);
  // Creating empty featureCollection to export
  var destinations = featureCollection([]);
  var i = 0; // counter for OSRM
  var routedNum = 0;
  var gridData = [];

  getNext(i);

  var counter = 0 ; 
  function getNext(i){
    if(destinations.length >= targets.length){
        return
    }
    if(i < targets.features.length) {
      var query = {
        coordinates: [
            [
              center[1], center[0]
            ],
            [
              targets.features[i].geometry.coordinates[1], targets.features[i].geometry.coordinates[0]
            ]
          ]
      }; 

      osrm.route(query, function (err, res) {
          i++;
          if(err) console.log(err)
          if(err) return done(err)
          else if (!res || !res.route_summary) {
            destinations.features.push({
              type: 'Feature',
              properties: {
                  eta: time
                  //,dist: 500
              },
              geometry: {
                  type: 'Point',
                  coordinates: [query.coordinates[1][1], query.coordinates[1][0]]
              }
            });
          } else {
            // console.log(getTripCost(res.route_summary.total_distance, carData, res.route_summary.total_time) + "Time : " + res.route_summary.total_time);
            if (getTripCost(res.route_summary.total_distance, carData, res.route_summary.total_time) <= ((maxCost/5.0)) * 1 ){
                gridData.push({x: query.coordinates[1][1],
             y: query.coordinates[1][0],
              z:5 })

            } else if (getTripCost(res.route_summary.total_distance, carData, res.route_summary.total_time)  <= ((maxCost/5.0)) * 2 ){
                       gridData.push({x: query.coordinates[1][1],
             y: query.coordinates[1][0],
              z:4 })

            }else if (getTripCost(res.route_summary.total_distance, carData, res.route_summary.total_time)<= ((maxCost/5.0)) * 3 ){
                       gridData.push({x: query.coordinates[1][1],
             y:  query.coordinates[1][0],
              z:3 })

            }else if (getTripCost(res.route_summary.total_distance, carData, res.route_summary.total_time) <= ((maxCost/5.0)) * 4 ){
                       gridData.push({x: query.coordinates[1][1],
             y:  query.coordinates[1][0],
              z:2 })

            } else {
                       gridData.push({x: query.coordinates[1][1],
             y:  query.coordinates[1][0],
              z:-10 })

            }

            destinations.features.push({
                type: 'Feature',
                properties: {
                    eta: res.route_summary.total_time,
                    dist: res.route_summary.total_distance
                },
                geometry: {
                    type: 'Point',
                    coordinates: [res.via_points[1][1], res.via_points[1][0]]
                }
                });
              routes.features.push(decode(res));
          }
          getNext(i);
        });
    } else {
        var xmin = bbox[0];
        var xmax = bbox[2];
        var interval = (xmax - xmin) / resolution;
        // console.log(gridData)
        // var line = isolines(destinations, 'eta', resolution, [time]);
        var outData = { gridHeight: resolution + 1 , gridWidth: resolution + 1 , y0: gridData[0].y, x0: gridData[1].x, dx: -interval , dy: -interval, position:gridData }
        // console.log(gridData)
        return done(null, outData);
    }
  }
}

function decode (res) {
    var route = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: polylineDecode(res.route_geometry)
        },
        properties: {
            eta: res.route_summary.total_time,
            dist: res.route_summary.total_distance
        }
    };
    route.geometry.coordinates = route.geometry.coordinates.map(function(c){
        var lon = c[1] * 0.1;
        var lat = c[0] * 0.1;
        return [lon, lat];
    });
    return route;
}

function getGasPrice (type){
  if(type.indexOf('reg')){
    return 2.837;
  } else if(type.indexOf('med')){
    return 2.962;
  } else {
    return 3.064;
  }
}

// Should using most recent car data for California to Calculate the trip cost

function getTripCost (length, carData, time) {
  //cpg =: cost per gallon 
  var cpg = null;
  (carData['fuelType']);
  var metersToMiles = function(length){
    return length / 1609.34;
  }

  var com_mpg = +carData["Epa Combined Mpg"] ; 
  var city_mpg = +carData["Epa City Mpg"] ;
  var high_mpg = +carData["Epa Highway Mpg"] ;
  var t_cost = 0;

  if(com_mpg){

    cpg = getGasPrice(carData['fuelType']);
    t_cost = cpg * ( metersToMiles(length) /com_mpg );

  } else if(city_mpg){

    cpg = getGasPrice(carData['fuelType']);
    t_cost = cpg * ( metersToMiles(length) /city_mpg );

  } else if(high_mpg){

    cpg = getGasPrice(carData['fuelType']);
    t_cost = cpg  * ( metersToMiles(length) /city_mpg );

  } else {

    cpg = 2.962;
    t_cost = cpg * ( metersToMiles(length) / 15);

  }

  return t_cost
}

// get the car fuel data from req
function stripCarData ( req, callback ){

  var fuelData ;

  client.getEquipmentDetailsByStyle({styleId : req.body.id }, function (err, data) {

    if(err){
      console.log(err);
    } else {

    var carInfo = data.equipment.filter(function (eData) {
      return eData.name === 'Specifications' || eData.name ===  'Engine';
    });

    fuelData = carInfo.reduce(function (dataOb, item) {
      if(item.name === 'Specifications'){
        item.attributes.filter(function (attr) {
          return attr.name === "Epa Combined Mpg" || attr.name === "Epa City Mpg" || attr.name === "Epa Highway Mpg"
        }).forEach(function (attr){
          dataOb[attr.name] = attr.value;
        })
    } else {
      dataOb["fuelType"] = item["fuelType"];
    }

    return dataOb;

    }, {});

    callback(null, fuelData);

   }

  })

}

/**
*  
* Endpoint usage starts here, should be the only thing is this file
*
*/

exports.index = function (req, res) {
  var resolution = 25; // sample resolution
  var network = "null" ; 
  var time = 3000; // 300 second drivetime (5 minutes)
  var location = [req.body.coordinate.x ,req.body.coordinate.y ]; // center point
  var out = [];
  var fuelData ;
  var maxCost = req.body.cost; 

    stripCarData(req, function (err, fuelData) {


      time = (( maxCost / 2.837 ) * Number(fuelData['Epa Combined Mpg'] || 15 ) * 90 );

      getPolygons(location, time, resolution, network , fuelData, maxCost, function(err, drivetime) {
        if(err) throw err;
        out.push((drivetime))
        // a geojson linestring
        res.send(JSON.stringify(out))
        //res.end('end')
      });
  })
 
};

// Sends all the makes to client
exports.getMakes = function (req, res) {
  client.getAllMakes({}, function (err, data) {
    res.send(JSON.stringify(data))
  })
}

// Send all the Cars to the client
exports.getCars = function (req, res) {
  var car = req.body;
   client.getModelDetails( car , function (err, data) {
    res.send(JSON.stringify(data));
   })
}




