import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()}>
            <button
              className="relative flex flex-col items-center
        justify-center gap-4 border-2 border-dashed border-neutral-300 p-20
        text-neutral-400 transition hover:opacity-70"
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Click to Upload</p>
              {value && (
                <div className="absolute inset-0 h-full w-full">
                  <Image fill className="object-cover" src={value} alt="Car" />
                </div>
              )}
            </button>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
