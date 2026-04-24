import React from 'react'
import { Image } from '@tarojs/components'

interface TaroImgProps {
  src: string
  className: string
  style: React.CSSProperties
  onClick: () => void
  lazyLoad?: boolean
  mode?: 'aspectFit' | 'aspectFill' | 'scaleToFill' | 'widthFix'
  onLoad: () => void
}

export const TaroImg: React.FC<TaroImgProps> = ({
  src,
  className,
  style,
  onClick,
  lazyLoad = false,
  mode = 'aspectFit',
  onLoad,
}) => {
  return (
    <Image
      src={src}
      mode={mode}
      className={className}
      style={style}
      onClick={onClick}
      lazyLoad={lazyLoad}
      onLoad={onLoad}
    />
  )
}
