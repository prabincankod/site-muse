'use client';

import Image from 'next/image';
import Link from 'next/link';

type BookmarkProps = {
  link: any;
  projectId: string;
};

export const Bookmark = ({ link, projectId }: BookmarkProps) => {
  return (
    <>
      <div>
        <Link
          href={`/dashboard/${projectId}`}
          className="flex flex-row space-x-1 items-center group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1.5 h-4 w-4 group-hover:text-slate-500"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <p className="group-hover:text-slate-500">Back</p>
        </Link>
      </div>

      <div className="pt-20 relative">
        <Image
          src={link.imageUrl}
          alt=""
          width={900}
          height={500}
          quality={100}
          className="rounded-t-lg border h-full"
        />
      </div>
    </>
  );
};
