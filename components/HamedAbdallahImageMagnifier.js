import { Button, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import Styles from '../styles/pages/product.module.css';
import Image from 'next/image';
import { HamedAbdallahWhiteSpace } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function HamedAbdallahImageMagnifier({
  src,
  otherImages,
  width,
  height,
  magnifierHeight = 300,
  magnifieWidth = 350,
  zoomLevel = 1.5,
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [zoomFlag, setZoomFlag] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(src);
  const handleZoomChange = () => {
    setZoomFlag(!zoomFlag);
  };

  const showModal = () => {
    setModalFlag(true);
  };
  const closeModal = () => {
    setModalFlag(false);
  };

  const pickFeaturedImageHandler = async (image) => {
    setFeaturedImage(image);
  };
  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: width,
      }}
    >
      <img
        src={src}
        className={Styles.featuredImage}
        style={{ height: height, width: width }}
        onClick={showModal}
      />

      <Modal
        open={modalFlag}
        onClose={closeModal}
        className={Styles.modalBase}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Styles.modalRoot}>
          {/* <HamedAbdallahWhiteSpace /> */}
          <br></br>
          <br></br>{' '}
          <div className={Styles.modalBtnBase}>
            {!zoomFlag ? (
              <Button
                onClick={handleZoomChange}
                style={{ backgroundColor: '#ca222a' }}
                className={Styles.modalBtn}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  size="2x"
                  style={{ color: 'white' }}
                />
              </Button>
            ) : (
              <Button className={Styles.modalBtn} onClick={handleZoomChange}>
                <FontAwesomeIcon
                  icon={faSearch}
                  size="2x"
                  style={{ color: '#ca222a' }}
                />
              </Button>
            )}
          </div>
          <br></br> <br></br>{' '}
          <Image
            src={featuredImage}
            onMouseEnter={(e) => {
              // update image size and turn-on magnifier
              const elem = e.currentTarget;
              const { width, height } = elem.getBoundingClientRect();
              setSize([width, height]);
              setShowMagnifier(true);
            }}
            onMouseMove={(e) => {
              // update cursor position
              const elem = e.currentTarget;
              const { top, left } = elem.getBoundingClientRect();

              // calculate cursor position on the image
              const x = e.pageX - left - window.pageXOffset;
              const y = e.pageY - top - window.pageYOffset;
              setXY([x, y]);
            }}
            onMouseLeave={() => {
              // close magnifier
              setShowMagnifier(false);
            }}
            alt={'img'}
            width={905}
            height={550}
            className={Styles.modalImage}
            priority={true}
          />
          <div
            style={{
              display: showMagnifier ? '' : 'none',
              position: 'absolute',
              //   objectFit: 'contain',
              // prevent magnifier blocks the mousemove event of img
              pointerEvents: 'none',
              // set size of magnifier
              height: `${magnifierHeight}px`,
              width: `${magnifieWidth}px`,
              // move element center to cursor pos
              top: `${y - magnifierHeight / 5}px`,
              left: `${x + magnifieWidth / 2}px`,
              opacity: '1', // reduce opacity so you can verify position
              border: '1px solid lightgray',
              backgroundColor: 'white',
              backgroundImage: `url('${featuredImage}')`,
              backgroundRepeat: 'no-repeat',

              //calculate zoomed image size
              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,

              //calculate position of zoomed image.
              backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
            hidden={zoomFlag}
          ></div>
          <br></br>
          <br></br>
          {/* <hr></hr> */}
          <div className={Styles.modalOtherImages}>
            <Image
              src={src}
              alt="f"
              width={200}
              // placeholder="blur  "
              loading="eager"
              height={200}
              priority={true}
              onClick={() => pickFeaturedImageHandler(`${src}`)}
              className={Styles.modalOtherImage}
            />
            {otherImages.map((img) => (
              <Image
                src={img.source}
                alt="f"
                width={200}
                // placeholder="blur"
                loading="eager"
                height={200}
                onClick={() => pickFeaturedImageHandler(`${img.source}`)}
                priority={true}
                className={Styles.modalOtherImage}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
