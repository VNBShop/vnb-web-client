type IProps = {
  photo: File
  keyFolder: string
}

export default async function useUploadPhoto({ photo, keyFolder }: IProps) {
  const data = new FormData()
  data.append('file', photo)
  data.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
  )
  data.append(
    'cloud_name',
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string
  )
  data.append('folder', keyFolder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: data,
    }
  )

  return response.json()
}
