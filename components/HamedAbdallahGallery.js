import React from 'react';
import ResponsiveGallery from 'react-responsive-gallery';

function HamedAbdallahGallery() {
  const images = [
    {
      src: '/Brands-01.png',
    },
    {
      src: 'Brands-02.png',
    },
    {
      src: 'Brands-03.png',
    },
    {
      src: 'Brands-04.png',
    },
    {
      src: 'Brands-05.png',
    },
    {
      src: 'Brands-06.png',
    },
    {
      src: 'Brands-07.png',
    },
    {
      src: 'Brands-08.png',
    },
    {
      src: 'Brands-09.png',
    },
    {
      src: 'Brands-10.png',
    },
    {
      src: 'Brands-11.png',
    },
  ];

  return <ResponsiveGallery images={images} />;
}
export default dynamic(() => Promise.resolve(HamedAbdallahGallery), {
  ssr: false,
});
