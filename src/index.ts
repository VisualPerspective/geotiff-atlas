import * as parseArgs from 'minimist'
import { dirname, join, resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import DataTiff from './DataTiff'
import Atlas from './Atlas'

const argv = parseArgs(process.argv.slice(2))
let config: any
let configFolder: string
let outputFolder: string

try {
  config = JSON.parse(readFileSync(argv.config, 'utf-8'))
  configFolder = dirname(argv.config)
} catch (e) {
  // tslint:disable-next-line
  console.log('Please specify a valid config file using --config \n')
  process.exit(1)
}

try {
  outputFolder = resolve(argv.outputFolder)
} catch (e) {
  // tslint:disable-next-line
  console.log('Please specify an output folder using --outputFolder \n')
  process.exit(1)
}

const createAtlas = async () => {
  const loaders = config.TIFFS.map((tiffPath: string) => {
    const file = readFileSync(join(configFolder, tiffPath))
    return DataTiff.fromArrayBuffer(file.buffer as ArrayBuffer)
  })

  // TODO: figure out why casting is needed after Promise.all
  const tiffs = (await Promise.all(loaders)).map(x => (x as DataTiff))

  const atlas = new Atlas({ tiffs, textureSize: config.TEXTURE_SIZE })
  atlas.processTiffs()

  writeFileSync(
    join(outputFolder, `${config.NAME}.atlas`),
    new Uint8Array(atlas.data.buffer)
  )

  writeFileSync(
    join(outputFolder, `${config.NAME}.atlas.json`),
    JSON.stringify(atlas.metadata, null, 2)
  )
}

createAtlas()
