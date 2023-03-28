import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { IconProps } from 'react-native-vector-icons/Icon'
import React from 'react'

export const Icons = (props: IconProps) => <MaterialIcon {...props} />

const withIconProps = (
  WrappedIconComponent: React.ComponentType<IconProps>,
  name: string
) => {
  return (props: Omit<IconProps, 'name'> & { name?: string }) => {
    return <WrappedIconComponent name={name} {...props} />
  }
}

const withFontAV5Icon = (name: string) => withIconProps(FontAwesome5Icon, name)
const withMaterialIcon = (name: string) => withIconProps(MaterialIcon, name)

export const LikeIcon = withFontAV5Icon('thumbs-up')

export const CommentIcon = withMaterialIcon('chat')

export const AddIcon = withMaterialIcon('add')
