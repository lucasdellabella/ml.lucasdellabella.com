'use client'

import React, { ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import Image from 'next/image'

const BrainTumorSegmentationV1Widget = ({ imagePaths }: { imagePaths: Array<string> }) => {
  const [currentImagePath, setCurrentImagePath] = useState('')
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
              onClick={() => setCurrentImagePath(path)}
              className="relative h-14 w-14 rounded-lg border overflow-clip border-slate-700 bg-black hover:bg-black hover:opacity-75 px-4 py-2"
            >
              <Image
                src={path}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="contain"
                className="m-0"
              />
            </Button>
          ))}
        </div>
        <hr className="my-4"></hr>
        <div className="flex justify-center items-center w-full h-80 py-8 space-x-2">
          {currentImagePath === '' ? (
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
          ) : (
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
          )}
        </div>
        <hr className="my-4"></hr>
        <div className="flex items-center space-x-4">
          <Button variant="default" size="lg">
            Go
          </Button>
          <Progress value={33} />
        </div>
      </CardContent>
    </Card>
  )
}

export default BrainTumorSegmentationV1Widget
