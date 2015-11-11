

angular.module('201510MvpApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, $mdToast, $mdDialog) {
    $scope.loading = false;
    $scope.userCar = {};
    $scope.makes = [];
    $scope.models = [];
    $scope.years = [];
    $scope.cost = 2.54;
    $scope.disableRecal = false ;
    $scope.carSelected = true ;
    $scope.disableRecal = true ; // When on the app will do recalculation when new data is put in
    $scope.gas_types = ['REG', 'MED', 'PREMIUM'];
    var carId = 11937;


    $scope.selectCar = function (){

      $scope.showSimpleToast()
	    $scope.carSelected = true ;
	    $scope.userCar.make = '';
	 		$scope.userCar.model = '';
	 		$scope.userCar.year = '';
	 		$scope.userCar.style = '';
      $scope.userCar.gas_type = '';

    }

    // This is avoid an error on the watch function so when the user car data is set there isn't function call
    var first = true

    $scope.$watch('userCar', function (userCar){
    	if(first){
    		first = !first; // 
    	} else {

      // if it's not the first change 
  		$scope.disableRecal = true ;
      // Setting the car model
      $scope.models = $scope.makes.filter(function (item){
        return item.name === userCar.make;
      })[0].models

      // If a model has been selected then you can select a year
    	if(userCar.model){
    		var tempYear = $scope.models.filter(function (item){
    		return item.name === userCar.model;
      	})[0];

        // If a year has been selected then upadte scope year
    		if(tempYear){
    		 $scope.years = tempYear.years
    		} else {
        // Reset the data
      		$scope.years = [];
      		userCar.year = '';
      		userCar.model = '';
      		$scope.models = [];
      		userCar.style = '';
    		}
    	}
      // If a user car has been selected
    	if(userCar.style){
    	  carId = $scope.styles.filter(function (item){
    			return item.name== userCar.style;
    		})[0].id
    	}
		}
  }, true)

    // Gets all cars from edmounds api
    $scope.getCars = function (){
      return $http.post('/api/machines/cars', $scope.userCar ).success(function(response) {
        $scope.styles = (response.years[0].styles);
      }).error(function (){
        $scope.showSimpleToast('Error Connecting to Server!!')
      });
    }

    // TO Comment : To Move
    var car = {
      type: 'Car',
      cost : 0, 
      speed : 70, 
      model :'',
      cpm : 0, 
      tags: [{ name :'Longest Trip' , val :'134.43ml' }, {name: 'er Mile', val :  '$0.35'  }],
      more : [{name: 'Car Make' , val : this.make } ],
      make : ''
    }

    // Setting the max amount of money you can enter To Remove
    $scope.okayR = true ;
    $scope.okayMin = true ;
    $scope.okayMax = true ;

    $scope.$watch('cost',function (cost){
      // Turning off recalcution
      $scope.disableRecal = false ;

      if(cost < .50){
        $scope.okayMin = false ;
        $scope.okayR = $scope.okayMax = true ;
      } else if (cost > 300){
        $scope.okayMax = false ; 
        $scope.okayR = $scope.okayMin = true ;
      } else if ( cost === undefined ){
        $scope.okayR = false ;
        $scope.okayMin = $scope.okayMax = true ;
      } else {
        $scope.okayR = $scope.okayMin = $scope.okayMax = true ;
      }
    })

    // Setting the car data To Move
    $scope.current = car;
    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    };


     $scope.showSimpleToast = function(text) {
        $mdToast.show(
          $mdToast.simple()
            .content(text || 'Changing Network')
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    }

  // Geo JS Stuff

    // Define a function we will use to generate contours.
    function makeContour(data, layer) {
      /* There are two example data sets.  One has a position array which
       * consists of objects each with x, y, z values.  The other has a values
       * array which just has our contour values. */
      var contour = layer.createFeature('contour')
        .data(data.position || data.values)
        .style({ opacity: 0.5 })
        .contour({
          gridWidth: data.gridWidth,
          gridHeight: data.gridHeight,
          stepped: true,
          min: 0,
          colorRange: ["#006837", "#39B54A", "#8CC63F", "#F7931E", "#F15A24", "#C1272D", "#C1272D", "#C1272D"].reverse()

          /* The color range doesn't have to be linear:
          rangeValues: [0, 25, 50, 75, 100, 125, 250, 500, 750, 2000],
           */
          /* Or, you could plot iso-contour lines using a varying opacity:
          rangeValues: [100, 100, 200, 200, 300, 300, 400, 400, 500, 500],
          opacityRange: [1, 0, 1, 0, 1, 0, 1, 0, 1],
           */
          /* You can make smooth contours instead of stepped contours:
          stepped: false,
           */
        });

      if (data.position) {
        contour
        .position(function (d) { return {x: d.x, y: d.y, z: d.z}; })
        .style({
          value: function (d) { return d.z > -9999 ? d.z : null; }
          /* You can get better contours if you set a minimum value and set
           * sea locations to a small negative number:
          value: function (d) { return d.z > -9999 ? d.z : -10; }
           */
        });
      } else {
        contour
        .style({
          value: function (d) { return d > -9999 ? d : null; }
        })
        .contour({
          /* The geometry can be specified using 0-point coordinates and deltas
           * since it is a regular grid. */
          x0: data.x0, y0: data.y0, dx: data.dx, dy: data.dy
        });
      }
      return contour;
    }  

  // Create a map object with the OpenStreetMaps base layer centered in Sao Paulo 
  var map = geo.map({
    node: '#map',
    center: {
      x: -122.4189453125,
      y: 37.78391496722271
    },
    zoom: 11
  });

  // Lengend 

  // Add the osm layer
  map.createLayer(
    'osm'
  );

  // Create a gl feature layer for cost contours
  var vglLayer = map.createLayer(
    'feature',
    {
      renderer: 'vgl'
    }
  );

  var layer = map.createLayer('feature', {'renderer' : 'd3'});

  $scope.reCal = function (){
  	$scope.loading = true ;
  	$scope.showSimpleToast('Analyzing ' + $scope.current.type + ' Network')
  	getPolygons($scope.currentPoint[0]);
  }


  // Makes server calls to get polygon data for drawing
   function getPolygons(coordinate){
  	vglLayer.clear()

  	if($scope.cost >= 1 && $scope.cost <= 20 ){
   	  $scope.disableRecal = true ;
  		$http.post('/api/machines', {coordinate: coordinate , id: carId, cost: $scope.cost })
        .success(function(response) {
  		    var data = (response[0]);
  		    var contour = makeContour(data, vglLayer);
  		    $scope.loading = false;
  		    $scope.disableRecal = true ;
  		  	map.draw();
  	    })
        .error(function (){
  	    	$scope.showSimpleToast('Error Connecting to Server!!')
  	    });
    	} else {
      	$scope.loading = false;
      	if($scope.cost > 20 ){
      		$scope.showAlert(undefined,'The cost value you entered too high', 'High Alert')
      	 }
        if($scope.cost < 1){ 
      		$scope.showAlert(undefined,'The cost value you entered too low', 'Low Alert')
      	}
    	}
    }

 	 // Legend Creation
    var ui = map.createLayer('ui');
    ui.createWidget('slider');
    var legend = ui.createWidget('legend', {
      position: {
        right: 20,
        top: 10
      }
    });

// This was to update the data the Legend and deal with some of the validation
// To Refactor

$scope.$watch('cost',function (cost){
	if(cost < 1 ){
		$scope.okayMin = false;
		$scope.okayMax = true;
		$scope.okayReq = true;

	} else if ( cost > 20 ){
		$scope.okayMin = true;
		$scope.okayMax = false;
		$scope.okayReq = true;
	} else if( cost === undefined){
		$scope.okayReq = true;
		$scope.okayMin = true;
		$scope.okayMin = false;
	} else {
		$scope.okayReq = true;
		$scope.okayMin = true;
		$scope.okayMin = true;	
	}
  legend.categories([
    {
      name: ' < $' + (cost / 5).toFixed(2),
      style: {
        strokeColor: "#006837",
        strokeWidth: 10,
        strokeOpacity: 0.75
      },
      type: 'line'
    },
    {
      name: ' < $' + ((cost / 5)*2).toFixed(2),
      style: {
        strokeColor:  "#39B54A",
        strokeWidth: 10,
        strokeOpacity: 0.75
      },
      type: 'line'
    },

    {
      name: ' < $' + ((cost / 5)*3).toFixed(2),
      style: {
        strokeColor:  "#8CC63F",
        strokeWidth: 10,
        strokeOpacity: 0.75
      },
      type: 'line'
    },

     {
      name: ' < $' + ((cost / 5)*4).toFixed(2),
      style: {
        strokeColor:  "#F7931E",
        strokeWidth: 10,
        strokeOpacity: 0.75
      },
      type: 'line'
    },

     {
      name: ' < $' + ((cost / 5)*5).toFixed(2),
      style: {
        strokeColor:  "#F15A24",
        strokeWidth: 10,
        strokeOpacity: 0.75
      },
      type: 'line'
    }
  ]);
})

// Current point on the screen

$scope.currentPoint = [{
      x: -122.4189453125,
      y: 37.78391496722271
    }];

// Adding d3 layer
    var dot = layer.createFeature('point')
    .data($scope.currentPoint)
    .style('radius', 5)
    .style('fillColor', function () { return 'steelblue'; })
    .position(function (d) { return d; });
    map.draw();


	var circle = d3.select('.d3PointFeature')

	circle.each(pulse)
		function pulse() {
			(function repeat() {
				circle = circle.transition()
					.duration(2000)
					.attr("stroke-width", 0)
					.attr("r", 5)
					.transition()
					.duration(100)
					.attr('stroke-width', 0)
					.attr("r", 20)
					.ease('linear')
					.each("end", repeat);
			})();
	  }

  // A fix so that panning doesn't cause acciedently redraw of polygons sorta hacky
	var panning = false;
	var mousedown = 0;
	document.body.onmousedown = function (){
		mousedown++;
	}

	document.body.onmouseup = function(){
		mousedown--;
	}

	vglLayer.geoOn( geo.event.pan, function (){
		panning = true;
		if(!mousedown){
		panning = false;
		}
	})
  // On click make a call to the api 
	vglLayer.geoOn(geo.event.mouseclick,function (data){
  	if(panning){
  		panning = !panning ;
  	} else {
      $scope.loading = true ;
      $scope.showSimpleToast('Analyzing ' + $scope.current.type + ' Network')
      $scope.currentPoint = [{
        x:  data.geo.x,
        y: data.geo.y
      }]
      
      getPolygons({
        x:  data.geo.x,
        y: data.geo.y
      })

      dot.data($scope.currentPoint)
      map.draw();
  	}
  })

  // Getting the original setup for makes
	$http.get('/api/machines/makes').success(function(response) {
		$scope.makes = (response.makes);
    }).error(function (){
    	 $scope.showSimpleToast('Error Connecting to Server!!')
    });

    // $scope.reCal();

  });
