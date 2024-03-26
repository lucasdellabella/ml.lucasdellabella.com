'use client'

import React, { ReactNode, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import Image from 'next/image'

const BrainTumorSegmentationV1Widget = ({
  imagePaths,
  createPrediction,
}: {
  imagePaths: Array<string>
  createPrediction: (imagePath: string) => Promise<string>
}) => {
  const [currentImagePath, setCurrentImagePath] = useState('')
  const [progressValue, setProgressValue] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState('')

  const selectNewImage = (imagePath: string) => {
    setLoading(false)
    setError(null)
    setData('')
    setProgressValue(0)
    setCurrentImagePath(imagePath)
  }

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
      setData(result)
      setProgressValue(100)
      console.log(JSON.stringify(result))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const renderSelectedImages = () => {
    if (currentImagePath === '') {
      return (
        <>
          <div className="flex-grow w-full h-full flex justify-center items-center rounded-lg border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full flex justify-center items-center">
                <div className="opacity-50">Image Placeholder</div>
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor ground truth</span>
              </div>
            </div>
          </div>
          <div className="flex-grow w-full h-full flex justify-center items-center rounded-lg border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full flex justify-center items-center">
                <div className="opacity-50">Image Placeholder</div>
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor prediction</span>
              </div>
            </div>
          </div>
        </>
      )
    } else if (data === '') {
      return (
        <>
          <div className="flex-grow w-full h-full flex-col justify-center items-center rounded-lg bg-black border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full">
                <Image
                  src={currentImagePath}
                  alt={`Selected image`}
                  layout="fill"
                  objectFit="contain"
                  className="m-0 flex-grow"
                />
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor ground truth</span>
              </div>
            </div>
          </div>
          <div className="flex-grow w-full h-full flex justify-center items-center rounded-lg border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full flex justify-center items-center">
                <div className="opacity-50">Image Placeholder</div>
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor prediction</span>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="flex-grow w-full h-full flex-col justify-center items-center rounded-lg bg-black border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full">
                <Image
                  src={currentImagePath}
                  alt={`Selected image`}
                  layout="fill"
                  objectFit="contain"
                  className="m-0 flex-grow"
                />
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor ground truth</span>
              </div>
            </div>
          </div>
          <div className="flex-grow w-full h-full flex justify-center items-center rounded-lg border border-slate-700">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="relative flex-grow w-full h-full">
                <Image
                  src={data}
                  alt={`Predicted image`}
                  layout="fill"
                  objectFit="contain"
                  className="m-0 flex-grow"
                />
              </div>
              <div className="py-2">
                <span className="italic">Brain tumor prediction</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <Card className="items-center justify-center">
      <CardContent className="flex-col justify-center items-center p-6">
        <div className="pb-1">Pick an image from our validation set:</div>
        <div className="flex w-full flex-wrap justify-between">
          {imagePaths.map((path, index) => (
            <Button
              key={index}
              variant="custom"
              size="custom"
              onClick={() => selectNewImage(path)}
              className="relative p-6 rounded-lg border overflow-clip border-slate-700 bg-black hover:bg-black hover:opacity-75 px-4 py-2"
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
        <hr className="my-4"></hr>
        <div className="flex justify-center items-center w-full h-80 py-8 space-x-2">
          {renderSelectedImages()}
        </div>
        <hr className="my-4"></hr>
        <div className="flex items-center space-x-4">
          <Button
            variant="default"
            size="lg"
            disabled={!currentImagePath || loading}
            onClick={async () => createPredictionForCurrentImage()}
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
          <Progress value={progressValue} />
        </div>
      </CardContent>
    </Card>
  )
}

export default BrainTumorSegmentationV1Widget
