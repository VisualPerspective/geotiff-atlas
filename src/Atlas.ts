import DataTiff from './DataTiff'

const OUTPUT_CHANNELS = 4

class Atlas {
  tiffs: DataTiff[]
  textureSize: number
  rasterWidth: number
  rasterHeight: number
  rastersPerTiff: number
  numRasters: number
  rastersWide: number
  rastersPerRow: number
  rastersHigh: number
  data: any

  constructor ({
    tiffs,
    textureSize,
  }: {
    tiffs: DataTiff[]
    textureSize: number
  }) {
    this.tiffs = tiffs
    this.rasterWidth = tiffs[0].width
    this.rasterHeight = tiffs[0].height
    this.textureSize = textureSize
    this.rastersPerTiff = tiffs[0].rasters.length
    this.numRasters = tiffs[0].rasters.length * this.tiffs.length
    this.rastersWide = Math.floor(this.textureSize / this.rasterWidth)
    this.rastersPerRow = this.rastersWide * OUTPUT_CHANNELS
    this.rastersHigh = Math.ceil(this.numRasters / this.rastersPerRow)

    const reader = tiffs[0].image.getReaderForSample(0)
    if (reader === DataView.prototype.getFloat32) {
      this.data = new Float32Array(
        this.rasterWidth * this.rastersWide *
        this.rasterHeight * this.rastersHigh *
        OUTPUT_CHANNELS
      )

      // tslint:disable-next-line
      console.log('initialdatalength',
        this.rastersWide, this.rastersWide * this.rasterWidth,
        this.rastersHigh, this.rastersHigh * this.rasterHeight
      )
    } else {
      throw new Error('Data format not supported - ' + reader)
    }
  }

  processTiffs = () => {
    let rasterIndex = 0
    this.tiffs.forEach((tiff) => {
      tiff.rasters.forEach((raster) => {
        const channel = rasterIndex % OUTPUT_CHANNELS
        const imageIndex = Math.floor(rasterIndex / OUTPUT_CHANNELS)
        const column = imageIndex % this.rastersPerRow
        const row = Math.floor(imageIndex / this.rastersPerRow)

        this.writeRaster({
          channel,
          column,
          row,
          raster: (raster as Float32Array),
        })

        rasterIndex += 1
      })
    })
  }

  writeRaster = ({
    channel,
    column,
    row,
    raster,
  }: {
    channel: number
    column: number
    row: number
    raster: Float32Array
  }) => {
    let maxIndex = 0
    raster.forEach((pixel, i) => {
      const x = (column * this.rasterWidth) + (i % this.rasterWidth)
      const y = (row * this.rasterHeight) + Math.floor(i / this.rasterWidth)
      const outputPixel = y * this.rasterWidth * this.rastersWide + x
      const outputIndex = outputPixel * OUTPUT_CHANNELS + channel
      maxIndex = Math.max(maxIndex, outputIndex)
      this.data[outputIndex] = pixel
    })
  }

  get metadata () {
    return {
      format: 'float32',
      rasterWidth: this.rasterWidth,
      rasterHeight: this.rasterHeight,
      numRasters: this.numRasters,
      rastersWide: this.rastersWide,
      rastersHigh: this.rastersHigh,
      channels: OUTPUT_CHANNELS,
    }
  }
}

export default Atlas
