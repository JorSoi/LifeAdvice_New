'use client'

import { useContext } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import '@/scss/BottomSheetDefaultStyling.scss'
import styles from './BottomSheetContainer.module.scss'
import { OverlayContext } from '@/lib/contexts'
import { OverlayContextType } from '@/types/home.types'
import Image from 'next/image'

export default function BottomSheetContainer({title, isOpen, children} : { title : string, isOpen : boolean, children: React.ReactNode}) {
  
  const {closeOverlay} = useContext(OverlayContext) as OverlayContextType

  return (
    <BottomSheet 
      open={isOpen}
      onDismiss={() => closeOverlay()}
      initialFocusRef={false}
      scrollLocking={true}
      expandOnContentDrag={true}
      onSpringStart={async (event) => {
        if (event.type === 'OPEN') {
          // Gives async children enough time to render data correctly before displaying it.
          const data = await new Promise((resolve) : any => setTimeout(() => {resolve('resolved')}, 200))
        }
      }}
      header={
        <div className={styles.headingContainer}>
          <div className={styles.gripHandle}></div>
          <div className={styles.titleWrapper}>
            <h3>{title}</h3>
            <div className={styles.closeButton} onClick={() => closeOverlay()}>
                <Image src={'/icons/closeSheet-icon.svg'} width={12} height={10} alt='' />
            </div>
          </div>
        </div>
      }
    >
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </BottomSheet>
  )
}