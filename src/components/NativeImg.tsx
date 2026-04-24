import React from 'react'
import { View } from '@tarojs/components'

interface NativeImgProps {
  src: string
  alt: string
  className: string
  style: React.CSSProperties
  onClick: () => void
  onLoad: () => void
  onError: () => void
}

export const NativeImg: React.FC<NativeImgProps> = ({
  src,
  alt,
  className,
  style,
  onClick,
  onLoad,
  onError,
}) => {
  return (
    <View className="relative w-full" style={{ minHeight: '320px' }}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onClick={onClick}
        onLoad={onLoad}
        onError={onError}
      />
    </View>
  )
}
