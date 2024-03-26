'use client'

import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import Image from 'next/image'
import { drawImageWithAnnotation, getAnnotationByFileName } from './readAnnotations'
import { cn } from '@/lib/utils'

type WidgetLayoutProps = {
  left: ReactNode
  right: ReactNode
  loading: boolean
  currentImagePath: string
  createPredictionForCurrentImage: () => void
  progressValue: number
  hidden: boolean
}

const WidgetLayout = ({
  left,
  right,
  loading,
  currentImagePath,
  createPredictionForCurrentImage,
  progressValue,
  hidden = false,
}: WidgetLayoutProps) => {
  return (
    <>
      <div
        className={cn(
          'flex-grow w-full h-full mr-2 flex justify-center items-center rounded-lg border bg-black border-slate-700',
          hidden ? 'hidden' : ''
        )}
      >
        <div className="relative flex flex-col justify-center items-center w-full h-full">
          <div className="relative flex-grow w-full h-full flex justify-center items-center">
            {left}
          </div>
          <div className="py-2">
            <span className="italic">Brain tumor ground truth</span>
          </div>
          <Button
            variant="default"
            size="lg"
            disabled={!currentImagePath || loading}
            onClick={async () => {
              // resetState()
              createPredictionForCurrentImage()
            }}
            className="absolute -bottom-2 translate-y-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Warming replicate container & making request...
              </>
            ) : (
              'Go'
            )}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'flex-grow w-full h-full flex justify-center items-center rounded-lg border bg-black border-slate-700',
          hidden ? 'hidden' : ''
        )}
      >
        <div className="relative flex flex-col justify-center items-center w-full h-full">
          <div className="flex-grow w-full h-full flex justify-center items-center">
            {right}
            <Progress className="absolute -bottom-6" value={progressValue} />
          </div>
          <div className="py-2">
            <span className="italic">Brain tumor prediction</span>
          </div>
        </div>
      </div>
    </>
  )
}

const BrainTumorSegmentationV1Widget = ({
  imagePaths,
  createPrediction,
  readImageData,
}: {
  imagePaths: Array<string>
  createPrediction: (imagePath: string) => Promise<string>
  readImageData: (filePath: string) => string
}) => {
  const [currentImagePath, setCurrentImagePath] = useState('')
  const [progressValue, setProgressValue] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState('')

  const isSelectImageStep = currentImagePath === ''
  const isReadyToQueryStep = currentImagePath !== '' && data === ''
  const isQueryCompleteStep = currentImagePath !== '' && data !== ''

  const resetState = () => {
    setLoading(false)
    setError(null)
    setData('')
    setProgressValue(-1)
  }

  const canvas = (
    <canvas
      id="image-canvas"
      className="absolute w-[200px] h-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  )

  const selectNewImage = (imagePath: string) => {
    resetState()
    setCurrentImagePath(imagePath)
  }

  useEffect(() => {
    const result = getAnnotationByFileName(currentImagePath.split('/').findLast((x) => x)!)!
    drawImageWithAnnotation('image-canvas-1', currentImagePath, result)
    drawImageWithAnnotation('image-canvas-2', currentImagePath, result)
  }, [currentImagePath, data, isQueryCompleteStep])

  const createPredictionForCurrentImage = async () => {
    try {
      setLoading(true)
      const intervalId = setInterval(() => {
        setProgressValue((currentProgressValue) => {
          // Ensure the progress does not exceed 100
          const nextProgressValue = currentProgressValue + 1
          return nextProgressValue > 100 ? 100 : nextProgressValue
        })
      }, 600)
      const result = await createPrediction(currentImagePath)
      clearInterval(intervalId)
      setData(await readImageData(result))
      setProgressValue(100)
      console.log(JSON.stringify(result))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="items-center justify-center">
      <CardContent className="flex-col justify-center items-center p-6 pb-10">
        <div className="pb-1">Pick an image from our validation set:</div>
        <div className="flex w-full flex-wrap justify-between">
          {imagePaths.map((path, index) => (
            <Button
              key={index}
              variant="custom"
              size="custom"
              onClick={() => selectNewImage(path)}
              className="relative p-6 rounded-lg border overflow-clip border-slate-700 bg-black hover:bg-black hover:opacity-75 px-4 py-2"
              disabled={loading}
            >
              <div className="relative h-14 w-14">
                <Image
                  src={path}
                  alt={`Image ${index}`}
                  layout="fill"
                  objectFit="contain"
                  className="m-0"
                />
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-center items-center w-full h-80 py-8">
          <WidgetLayout
            left={<div className="opacity-50">Image Placeholder</div>}
            right={<div className="opacity-50">Image Placeholder</div>}
            loading={loading}
            currentImagePath={currentImagePath}
            createPredictionForCurrentImage={createPredictionForCurrentImage}
            progressValue={progressValue}
            hidden={!isSelectImageStep}
          />
          <WidgetLayout
            left={
              <canvas
                id="image-canvas-1"
                className="absolute w-[200px] h-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
            right={<div className="opacity-50">Image Placeholder</div>}
            loading={loading}
            currentImagePath={currentImagePath}
            createPredictionForCurrentImage={createPredictionForCurrentImage}
            progressValue={progressValue}
            hidden={!isReadyToQueryStep}
          />
          <WidgetLayout
            left={
              <canvas
                id="image-canvas-2"
                className="absolute w-[200px] h-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            }
            right={
              <div className="relative w-full h-full">
                <Image
                  src={currentImagePath}
                  alt={`Predicted image`}
                  layout="fill"
                  objectFit="contain"
                  className="m-0 flex-grow"
                />
                <Image
                  src={data}
                  alt={`Predicted image`}
                  layout="fill"
                  objectFit="contain"
                  className="opacity-50 m-0 flex-grow"
                />
              </div>
            }
            loading={loading}
            currentImagePath={currentImagePath}
            createPredictionForCurrentImage={createPredictionForCurrentImage}
            progressValue={progressValue}
            hidden={!isQueryCompleteStep}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default BrainTumorSegmentationV1Widget
