import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import Image from 'next/image'
import { toast } from 'sonner'

import Icon from '@/common/icons'

import Spiner from '@/common/spiner'

export type ImageCloudinaryProps = {
  productAssetId: string
  productAssetUrl: string
}

type UploadFileProps = {
  size?: number
  maxLength?: number
}

export type UploadFileRefProps = {
  images: ImageCloudinaryProps[]
  isUploading: boolean
  update: (images: ImageCloudinaryProps[]) => void
}

const UploadFile = (
  { size = 70, maxLength }: UploadFileProps,
  ref: ForwardedRef<UploadFileRefProps>
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<ImageCloudinaryProps[]>([])

  const [loading, setLoading] = useState(false)

  const updateImages = (images: ImageCloudinaryProps[]) => {
    setImages(images)
  }

  useImperativeHandle(ref, () => ({
    images,
    update: updateImages,
    isUploading: loading,
  }))

  const onUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setLoading(true)

    if (
      file?.type !== 'image/png' &&
      file?.type !== 'image/jpg' &&
      file?.type !== 'image/jpeg'
    ) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      toast.error('Image is in wrong format 😢!')
      setLoading(false)
      return
    }

    const data = new FormData()
    data.append('file', file)
    data.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
    )
    data.append(
      'cloud_name',
      process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string
    )
    data.append('folder', 'user-threads')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      )
      const res = await response.json()

      setImages((prev) => [
        ...prev,
        { productAssetId: res?.asset_id, productAssetUrl: res?.secure_url },
      ])
    } catch (error) {
      toast.error('Upload image failed, try again 😢!')
    } finally {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      setLoading(false)
    }
  }

  const onDeleteImage = (image: ImageCloudinaryProps) => {
    setImages((prev) => {
      return prev.filter((img) => img.productAssetId !== image.productAssetId)
    })
  }

  return (
    <>
      <section className="flex w-full flex-wrap gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative rounded-md"
            style={{
              width: size,
              height: size,
            }}
          >
            <Image
              src={img.productAssetUrl}
              width={size}
              height={size}
              sizes="100vw"
              alt="image"
              className="h-full w-full rounded-md object-cover"
            />
            <div
              onClick={() => onDeleteImage(img)}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.44)] backdrop-blur hover:cursor-pointer"
            >
              <Icon name="Xmark" color="white" size={size * 0.23} />
            </div>
          </div>
        ))}

        {loading && (
          <div
            className="flex items-center justify-center"
            style={{
              width: size,
              height: size,
            }}
          >
            <Spiner size={size * 0.4} />
          </div>
        )}

        <label
          htmlFor="upload-image-product"
          className="flex flex-col items-center justify-center gap-[3px] rounded-md border border-dashed border-[#00be00] hover:cursor-pointer"
          style={{
            width: size,
            height: size,
            borderColor: loading ? 'gray' : '',
            color: loading ? 'gray' : '',
          }}
        >
          <Icon
            size={size * 0.4}
            name="PhotoPlus"
            color={loading ? 'gray' : '#00be00'}
          />

          <p
            className="text-[9px] text-[#00be00]"
            style={{ color: loading ? 'gray' : '' }}
          >
            ({images.length}/{maxLength ?? '∞'})
          </p>

          <p
            style={{ color: loading ? 'gray' : '' }}
            className="text-[10px] text-[#00be00]"
          >
            Add photos
          </p>
        </label>

        <input
          ref={inputRef}
          disabled={loading}
          type="file"
          id="upload-image-product"
          hidden
          onChange={onUploadFile}
          accept="image/png, image/jpg, image/jpeg"
        />
      </section>
    </>
  )
}

export default forwardRef<UploadFileRefProps, UploadFileProps>(UploadFile)
