import { fromArrayBuffer } from 'geotiff'

class DataTiff {
  tiff: any
  image: any
  rasters: ArrayBufferView[]
  width: any
  height: any

  async initialize (arrayBuffer: ArrayBuffer) {
    this.tiff = await fromArrayBuffer(arrayBuffer)
    this.image = await this.tiff.getImage()
    this.width = this.image.getWidth()
    this.height = this.image.getHeight()
    this.rasters = await this.image.readRasters()
  }

  static async fromArrayBuffer (arrayBuffer: ArrayBuffer) {
    const dataTiff = new DataTiff()
    await dataTiff.initialize(arrayBuffer)
    return dataTiff
  }
}

export default DataTiff
