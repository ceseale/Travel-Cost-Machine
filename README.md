# Cost Machine

Mapping application that visualizes travel radius based on fuel efficiency built with AngularJS, Node/Express and uses the Open Street Maps Routing Machine to calculate all the viable routes a car can take from a location. The application leverages the Edmunds API for data on the car fuel and engine type. The front end mapping uses Leaflet.js and WebGL to visualize traveling distance.

[Watch Demo on YouTube!](https://www.youtube.com/watch?v=jo3LorO5ZaM)
![Alt Text](https://github.com/ceseale/Travel-Cost-Machine/raw/master/gallery.jpg)

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
