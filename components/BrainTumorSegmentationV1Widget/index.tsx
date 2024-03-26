import React from 'react'
import BrainTumorSegmentationV1Widget from './BrainTumorSegmentationV1Widget'
import http from '@/lib/http'
import axios from 'axios'
import replicate from '@/lib/replicate'

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

async function toDataURL(url) {
  try {
    const response = await http.get(url, { responseType: 'arraybuffer' })
    const base64 = Buffer.from(response.data).toString('base64')
    const dataUrl = `data:image/jpg;base64,${base64}`
    return dataUrl
  } catch (error) {
    console.error('Error:', error)
  }
}

const apiToken = 'r8_KUYJRg6oppvzTBq5pj1V7FmloxJTtFt2L4VPm'

async function createPrediction(imagePath: string) {
  'use server'

  console.log('STARTING CREATION')
  const dataUrl = await toDataURL(imagePath)
  const output = await replicate.run(
    'lucasdellabella/brain-tumor-segmenter-v1:56c23936708f4a587f395dd35ea1d6f34ee6f84a94265abaaf2dd9bf19d8632c',
    {
      input: {
        image: dataUrl,
        scale: 1.5,
      },
    }
  )

  return output
}

async function fetchPrediction(predictionId: string) {
  'use server'

  await sleep(1000)

  await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`)
  console.log('RUNNING RSC FN')
  return 'TEST PREDICTION'
}

const Component = async ({ imagePaths }: { imagePaths: Array<string> }) => {
  return (
    <BrainTumorSegmentationV1Widget
      imagePaths={imagePaths}
      createPrediction={createPrediction}
      fetchPrediction={fetchPrediction}
    />
  )
}

export default Component
