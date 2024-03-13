import { useCallback, useRef, useState } from 'react'

import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { toast } from 'sonner'

import Icon from '@/common/icons'

import Spiner from '@/common/spiner'

import useUploadPhoto from '@/hooks/commons/useUploadPhoto'
import useUpdateUser from '@/hooks/user/useUpdateUser'

import { errorFallback } from '../../../public/common'
import { Photo } from '../../../types/user'
import { Button } from '../ui/button'

type IProps = {
  onCloseModal: () => void
}

export default function UpdateAvatarForm({ onCloseModal }: IProps) {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [photo, setPhoto] = useState<Photo>({} as Photo)

  const { loading: loadingChangeAvt, onUpdateInfo } = useUpdateUser({
    onCloseModal,
  })
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoading(true)
    const photo = acceptedFiles[0]

    if (
      photo?.type !== 'image/png' &&
      photo?.type !== 'image/jpg' &&
      photo?.type !== 'image/jpeg'
    ) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      setLoading(false)
      toast.error('Image is in wrong format 😢!')
      return
    }

    // const data = new FormData()
    // data.append('file', photo)
    // data.append(
    //   'upload_preset',
    //   process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
    // )
    // data.append(
    //   'cloud_name',
    //   process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string
    // )
    // data.append('folder', 'user-avatar')

    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await useUploadPhoto({
        keyFolder: 'user-avatar',
        photo: photo,
      })

      setPhoto({
        assetId: res?.asset_id,
        secureUrl: res?.secure_url,
      })
    } catch (error) {
      toast.error('Upload image failed, try again 😢!')
    } finally {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      setLoading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
    },
  })

  const onChangeAvt = () => {
    if (!photo?.assetId) return
    const payload = {
      avatar: photo,
    }

    onUpdateInfo(payload)
  }

  const onRemove = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = ''
    }
    setPhoto({} as Photo)
  }

  return !!photo?.secureUrl ? (
    <section className="flex flex-col items-center justify-center gap-10">
      <figure className="relative h-[160px] w-[160px] rounded-full">
        <Image
          src={photo.secureUrl ?? errorFallback}
          alt="Avatar"
          title="Avatar"
          fill
          sizes="100vw"
          className="rounded-full object-cover"
        />
      </figure>

      <section className="flex items-center justify-center gap-4">
        <Button
          disabled={loadingChangeAvt}
          variant="ghost"
          className="text-danger"
          onClick={onRemove}
        >
          Remove
        </Button>
        <Button
          disabled={loadingChangeAvt}
          onClick={onChangeAvt}
          className="space-x-1"
        >
          {loadingChangeAvt && <Spiner size={16} />}
          <span>Change avatar</span>
        </Button>
      </section>
    </section>
  ) : (
    <section className="px-4">
      {loading ? (
        <div className="flex items-center justify-end gap-1">
          <Spiner size={20} />
          <span className="text-sm text-gray-600">Uploading...</span>
        </div>
      ) : null}
      <div
        {...getRootProps()}
        className=" my-4 rounded-lg border border-dashed border-success py-10 hover:cursor-pointer"
      >
        <input {...getInputProps()} ref={inputRef} />
        {isDragActive ? (
          <p className="text-gray-5000 text-center text-sm">
            Drop the photo here ...
          </p>
        ) : (
          <p className="flex items-center justify-center gap-2 text-center text-sm text-success">
            <Icon name="PhotoPlus" size={20} />
            Drag drop some photo here, or click to select files
          </p>
        )}
      </div>
    </section>
  )
}
