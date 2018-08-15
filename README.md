# GeoTIFF Atlas

Pack many geotiffs into a single texture atlas.
Command line tool, currently used to pre-process data for our ([NDVI Viewer](https://github.com/VisualPerspective/ndvi-viewer))

*__Note:__ this is alpha software and requires documentation and tests before being generally useful.*

### Running the project
To run the project, you'll need:
* Node 9+
* A recent version of Yarn

Example usage:
* Clone this repo, and run `yarn` to install dependencies
* Run `yarn build` to build the project
* Download the iceland geotiffs and configuration:
  * `curl https://storage.googleapis.com/iceland-ndvi/static/iceland-ndvi-tiffs.zip`
  * Unzip the file and you'll see a JSON configuration file and folder full of geotiffs
