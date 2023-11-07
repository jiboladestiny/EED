'use client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface cardProps{
  image: string,
  title: string,
  id: number
}
const CourseCard = ({image,title,id}:cardProps) => {
  return (
    <div className="relative group shadow-s bg-gray-50 cursor-pointer">
      <Image alt="alt" width={500} height={200} className='h-[20rem]' src={image} />
      <h2 className="font-semibold text-xl text-center p-[1rem]">{title}</h2>
      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="bg-black text-white py-2 px-5">
          <Link href={`/${id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
}

export default CourseCard
