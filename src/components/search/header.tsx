import { BackAndButtonHeader } from '@/components/header/BackAndButtonHeader'
import { View } from 'react-native'
import { FieldErrors, useForm } from 'react-hook-form'
import { SearchValidator } from '@/shared/validators/hole/search'
import { useParams } from '@/shared/hooks/useParams'
import { useTheme } from 'react-native-paper'
import { ISearchResultParams } from '@/pages/hole/search/result/result'
import { CloseIcon, SearchIcon } from '@/components/icon'
import { SearchInput } from '@/components/form/Search'
import { Toast } from '@/shared/utils/toast'
import { useEffect } from 'react'

export interface SearchHeaderProps {
  placeholder?: string
  onSubmit: (data: SearchValidator) => void
  onDeleteInput?: () => void
}

export function SearchHeader({
  placeholder,
  onSubmit,
  onDeleteInput,
}: SearchHeaderProps) {
  const theme = useTheme()
  const params = useParams<ISearchResultParams>()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = useForm<SearchValidator>({
    defaultValues: {
      keywords: params?.keywords || '',
    },
  })

  const onError = (error: FieldErrors<SearchValidator>) => {
    Toast.error({
      text1: error.keywords!.message,
    })
  }

  const deleteInput = () => {
    setValue('keywords', '', { shouldDirty: true })
    onDeleteInput?.()
  }

  const onHandleSubmit = handleSubmit(onSubmit, onError)

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <BackAndButtonHeader
        onPress={onHandleSubmit}
        loading={false}
        submitText={'搜索'}
        buttonMode={'text'}
      >
        <View
          className={
            'flex flex-[5] flex-row space-x-2 rounded-full items-center px-2 py-1'
          }
          style={{
            backgroundColor: theme.colors.onBackground,
          }}
        >
          <SearchIcon size={16} />
          <View className={'h-6 flex-1'}>
            <SearchInput
              name={'keywords'}
              control={control}
              className={'text-xs'}
              cursorColor={theme.colors.primary}
              placeholder={placeholder}
              maxLength={100}
              onSubmitEditing={onHandleSubmit}
              autoFocus={true}
            />
          </View>
          {dirtyFields.keywords && (
            <CloseIcon size={16} onPress={deleteInput} />
          )}
        </View>
      </BackAndButtonHeader>
    </View>
  )
}
