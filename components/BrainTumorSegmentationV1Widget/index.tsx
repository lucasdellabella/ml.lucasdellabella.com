import React from 'react'
import BrainTumorSegmentationV1Widget from './BrainTumorSegmentationV1Widget'
import http from '@/lib/http'
import axios from 'axios'
import replicate from '@/lib/replicate'
import Jimp from 'jimp'

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

async function toDataURL(url) {
  const response = await http.get(url, { responseType: 'arraybuffer' })
  const base64 = Buffer.from(response.data).toString('base64')
  const dataUrl = `data:image/jpg;base64,${base64}`
  return dataUrl
}

const apiToken = 'r8_KUYJRg6oppvzTBq5pj1V7FmloxJTtFt2L4VPm'

async function createPrediction(imagePath: string) {
  'use server'

  console.info('STARTING CREATION')
  const dataUrl = await toDataURL(imagePath)
  const body = {
    input: {
      image: dataUrl,
      scale: 1.5,
    },
  }
  console.info(JSON.stringify(body))
  const output = (await replicate.run(
    'lucasdellabella/brain-tumor-segmenter-v1:56c23936708f4a587f395dd35ea1d6f34ee6f84a94265abaaf2dd9bf19d8632c',
    body
  )) as unknown as string

  return output
}

async function readImageData(filePath) {
  'use server'

  try {
    const response = await axios.get(filePath, { responseType: 'arraybuffer' })
    const image = await Jimp.read(response.data)
    return await image
      .quality(60) // Set image quality
      .getBufferAsync(Jimp.MIME_PNG) // Convert to PNG
      .then((pngBuffer) => {
        const dataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`
        return dataUrl
      })
  } catch (error) {
    console.error('Error reading image data:', error)
    throw new Error(error)
  }
}

const Component = async ({ imagePaths }: { imagePaths: Array<string> }) => {
  return (
    <BrainTumorSegmentationV1Widget
      imagePaths={imagePaths}
      createPrediction={createPrediction}
      readImageData={readImageData}
    />
  )
}

export default Component
