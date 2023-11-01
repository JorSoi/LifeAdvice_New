'use client'

import { useState, useRef, TouchEventHandler, MouseEventHandler } from 'react';
import styles from './CardItem.module.scss'; 

function CardItem({value, zLayer, index, bgColor} : {value:number, zLayer : number, index: number, bgColor: string}) {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [rotation, setRotation] = useState<number>(0)
    const [initialPointerPosition, setinitialPointerPosition] = useState<{x: number, y: number}>()
    const windowCenter : number = window ? window.innerWidth / 2 : 0; //Conditional ensures no issues during serverside rendering as window is usually only accessible client-side.
    const distanceFromCenter : number = x / windowCenter //Represents the percentage to which a card has been moved away from its original position relative to the window center. This value can be used as a swipe-threshold to trigger events.
    const swipeThreshold : number = 0.4 //The minimum % of distance from the center to be interpreted as a swipe. 

    const resetPosition = () : void => {
      if(cardRef.current) {
        cardRef.current.style.transition = 'transform 0.5s';
        cardRef.current.style.transform = `translateX(0px) translateY(0px)`;
        setX(0);
        setY(0);
        setRotation(0);
      }
    };

    const rotateCard = () : void => {
      const maxRotation : number = 20;
      setRotation(() => x/windowCenter * maxRotation)
    };

    const executeSwipe = (direction : 'left' | 'right') : void => {
      if(cardRef.current) {
        cardRef.current.style.transition = 'transform 1s ease';
        setX(() => direction == 'right' ? windowCenter*4 : windowCenter*-4)
      }
    } 
 
    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) : void => {
      setIsDragging(true);


      if (cardRef.current) {
        cardRef.current.style.transition = 'none'; //resets prior transition settings to enable smooth drag functionality.
        if(e.type == 'touchstart') {
          setinitialPointerPosition({x: (e as React.TouchEvent).touches[0].clientX, y: (e as React.TouchEvent).touches[0].clientY})
        } else {
          setinitialPointerPosition({x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY})
        }
      }
    };
  
    const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) : void=> {

      if (isDragging && cardRef.current && initialPointerPosition) {

        if(e.type == 'touchmove') {
          setX(() => (e as React.TouchEvent).touches[0].clientX - initialPointerPosition.x );
          setY(() => (e as React.TouchEvent).touches[0].clientY - initialPointerPosition.y );
        } else {
          setX(() => (e as React.MouseEvent).clientX - initialPointerPosition.x );
          setY(() => (e as React.MouseEvent).clientY - initialPointerPosition.y );
        }
        rotateCard(); 
      }  
    };
  
    const handlePointerUp = () => {
      setIsDragging(false);

      if(distanceFromCenter > swipeThreshold) {
        executeSwipe('right');
      } else if (distanceFromCenter < -swipeThreshold) {
        executeSwipe('left')
      } else {
        resetPosition();
      }
    };

  return (
    <div 
      ref={cardRef} 
      className={styles.cardItem} 
      style={{
        zIndex: zLayer,
        background: bgColor, 
        transform: `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`}} 
      onMouseDown={handlePointerDown} 
      onMouseMove={handlePointerMove} 
      onMouseUp={handlePointerUp} 
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onTouchCancel={handlePointerUp}
    > 
    <p>Lorem ipsum dolor sit amet. This is a very special lesson and advice which I would like to share with you. </p>
</div>
  );
};


export default CardItem;