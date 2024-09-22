import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowLeftCircleLine } from "react-icons/ri";

const BackButton = ({ destination = '/home' }) => {
  return (
    <div className='flex items-center'>
      <Link
        to={destination}
        className='mx-1 bg-background rounded-full p-3 flex items-center justify-center shadow-neumorphic hover:shadow-neumorphic-inset transition-transform duration-300 group'>
        <RiArrowLeftCircleLine className='mr-1 text-primary' size={24} />
        <span className="hidden group-hover:inline-block text-primary font-bold transition-opacity duration-300">
          BACK
        </span>
      </Link>
    </div>
  );
}

export default BackButton;
