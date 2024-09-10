import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

export function Dropzone({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop(acceptedFiles) {
      setImage(URL.createObjectURL(acceptedFiles[0]))
    },
  })
  return (
    <div
      {...getRootProps()}
      className="flex
              h-40
              w-[300px] cursor-pointer
              flex-col
              items-center justify-center
              rounded
              border
              border-dashed
              text-center
              text-sm
              text-gray-400
              "
    >
      <input {...getInputProps()} />
      <span className="flex flex-col items-center gap-4">
        Drag &apos;n drop an image file here or click
        <Upload className="size-7" />
      </span>
    </div>
  )
}
