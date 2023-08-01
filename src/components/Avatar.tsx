import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || '/blank-profile-picture.png'}
      alt="user avatar"
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};
export default Avatar;
