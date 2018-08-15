# GeoTIFF Atlas

Pack many geotiffs covering the same area and projection into a single texture atlas.
Command line tool, currently used to pre-process data for our [NDVI Viewer](https://github.com/VisualPerspective/ndvi-viewer)

*__Note:__ this is alpha software and requires documentation and tests before being generally useful.*

### Running the project
To run the project, you'll need:
* Node 9+
* A recent version of Yarn

Example usage:
* Clone this repo, and run `yarn` to install dependencies
* Run `yarn build` to build the project
* Download the iceland geotiffs and configuration:
  * `curl https://storage.googleapis.com/iceland-ndvi/static/iceland-ndvi-tiffs.zip > iceland-ndvi-tiffs.zip`
  * Unzip the file and you'll see a JSON configuration file and folder full of geotiffs
* Run the tool with `node dist/geotiff-atlas.js --config iceland-ndvi-tiffs/ndvi.json --outputFolder iceland-ndvi-tiffs`
* You'll see two new files in the `iceland-ndvi-tiffs` folder:
  * `ndvi.atlas`, a binary file containing the geotiff data, usable as a WebGL texture
  * `ndvi.atlas.json`, a configuration file describing how the geotiffs are packed into the texture atlas
  
See ([NDVI Viewer](https://github.com/VisualPerspective/ndvi-viewer)) for examples of how to load and access tiffs within the atlas. 
