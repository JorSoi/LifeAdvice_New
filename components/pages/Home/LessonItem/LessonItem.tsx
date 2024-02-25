'use client'

import { useState, useRef, useEffect } from 'react';
import styles from './LessonItem.module.scss'; 
import { Lesson } from '@/types/home.types';
import BookmarkButton from '@/components/global/Buttons/LessonItem/BookmarkButton/BookmarkButton';
import CommentButton from '@/components/global/Buttons/LessonItem/CommentButton/CommentButton';
import LikeButton from '@/components/global/Buttons/LessonItem/LikeButton/LikeButton';
import ShareButton from '@/components/global/Buttons/LessonItem/ShareButton/ShareButton';
import CategoryItem from '@/components/global/CategoryIcon/CategoryIcon';


function LessonItem ({lesson, index, removeLessonFromList, user, isDraggable} : {lesson: Lesson, index: number, removeLessonFromList: (idToRemove : number) => void, user : {} | null, isDraggable : boolean }) {

    const [isCurrentlyDragging, setIsCurrentlyDragging] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [rotation, setRotation] = useState<number>(0)
    const [initialPointerPosition, setinitialPointerPosition] = useState<{x: number, y: number}>()
    const windowCenter : number = window ? window.innerWidth / 2 : 0; //Conditional ensures no issues during serverside rendering as window is usually only accessible client-side.
    const distanceFromCenter : number = x / windowCenter //Represents the percentage to which a card has been moved away from its original position relative to the window center. This value can be used as a swipe-threshold to trigger events.
    const swipeThreshold : number = 0.4 //The minimum % of distance from the center to be interpreted as a swipe.
    


    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) : void => {
      setIsCurrentlyDragging(true);

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

      if (cardRef.current && isCurrentlyDragging && initialPointerPosition) {

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

    const rotateCard = () : void => {
      const maxRotation : number = 20;
      setRotation(() => x/windowCenter * maxRotation)
    };
   
    const handlePointerUp = () => {
      setIsCurrentlyDragging(false);

      if(distanceFromCenter > swipeThreshold) {
        executeSwipe('right');
      } else if (distanceFromCenter < -swipeThreshold) {
        executeSwipe('left')
      } else {
        resetPosition();
      }
    };

    const resetPosition = () : void => {
      if(cardRef.current) {
        cardRef.current.style.transition = 'transform 0.5s';
        cardRef.current.style.transform = `translateX(0px) translateY(0px)`;
        setX(0);
        setY(0);
        setRotation(0);
      }
    };


    const executeSwipe = (direction : 'left' | 'right') : void => {
      if(cardRef.current) {
        cardRef.current.style.transition = 'transform 1s ease';
        setX(() => direction == 'right' ? windowCenter*4 : windowCenter*-4)

        //Wait before removing the lesson from lessonList, to finish animation
        setTimeout(() => {
          removeLessonFromList(lesson.id)
        }, 240)
      }
    } 

    useEffect(() => {
      if(index == 0 && cardRef.current) {
        cardRef.current.style.boxShadow = '0px 4px 15px 6px rgba(129, 102, 61, 0.03)'
      }
    }, [index])

  return (
    <div 
      ref={cardRef} 
      className={styles.lessonItem} 
      style={{
        transform: `translateX(${x}px) translateY(${0}px) rotate(${rotation}deg)`}} //to enable vertical dragging, set translateY to "y"px.
      onMouseDown={isDraggable ? handlePointerDown : undefined} 
      onMouseMove={isDraggable ? handlePointerMove : undefined} 
      onMouseUp={isDraggable ? handlePointerUp : undefined} 
      onMouseLeave={isDraggable ? handlePointerUp : undefined}
      onTouchStart={isDraggable ? handlePointerDown : undefined}
      onTouchMove={isDraggable ? handlePointerMove : undefined}
      onTouchEnd={isDraggable ? handlePointerUp : undefined}
      onTouchCancel={isDraggable ? handlePointerUp : undefined}
    > 
    <div className={styles.headerWrapper}>
      <ShareButton lessonId={lesson.id} />
      <p className={styles.lessonCredentials}><span>Learned by </span>{lesson.author}</p>
      <CategoryItem categoryName={lesson.categories.category_name} />
    </div>
      
      <p className={styles.lessonContent}>"{lesson.lesson}"</p>
      
      <div className={styles.buttonWrapper}>
        <BookmarkButton lessonId={lesson.id} user={user}/>
        <CommentButton lessonId={lesson.id} />
        <LikeButton lessonId={lesson.id} user={user}/>
      </div>
    </div>
  );
};


export default LessonItem;