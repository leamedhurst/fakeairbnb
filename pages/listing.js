import Link from 'next/link';
import Image from 'next/image';

export default function Listing() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/send-message" className="block">
        <Image
          src="/bb.jpg"
          alt="Clickable image"
          width={800}
          height={500}
          className="rounded-lg object-cover cursor-pointer"
        />
      </Link>
    </div>
  );
}