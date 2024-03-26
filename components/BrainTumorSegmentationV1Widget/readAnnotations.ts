import annotations from './_annotations.coco.json'

type Image = {
  id: number
  license: number
  file_name: string
  height: number
  width: number
  date_captured: string
}

type BoundingBox = [number, number, number, number]

type Segmentation = number[][]

type Annotation = {
  id: number
  image_id: number
  category_id: number
  bbox: BoundingBox
  area: number
  segmentation: Segmentation
  iscrowd: number
}

type DataSet = {
  info: object
  licenses: object[]
  categories: object[]
  images: Image[]
  annotations: Annotation[]
}

export const getAnnotationByFileName = (fileName: string): Annotation | undefined => {
  const dataSet = annotations as DataSet
  const image = dataSet.images.find((img) => img.file_name === fileName)
  if (!image) {
    console.error('Image not found')
    return undefined
  }

  const annotation = dataSet.annotations.find((ann) => ann.image_id === image.id)
  if (!annotation) {
    console.error('Annotation not found')
    return undefined
  }

  console.log(annotation)

  return annotation
}

export async function drawImageWithAnnotation(
  canvasId: string,
  imageSrc: string,
  annotation: { bbox: number[] }
): Promise<void> {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('Unable to get canvas context')
    return
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Load the image
  const image = new Image()
  image.src = imageSrc
  await new Promise((resolve) => (image.onload = resolve))

  // Set canvas size to match the image
  canvas.width = image.width
  canvas.height = image.height

  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0)

  // Extract bounding box details
  const [x, y, width, height] = annotation.bbox

  // Set the style for the rectangle
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 3

  // Draw the rectangle around the annotated area
  ctx.strokeRect(x, y, width, height)
}
