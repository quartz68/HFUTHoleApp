import { configurePersistable } from 'mobx-persist-store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { enGB, registerTranslation } from 'react-native-paper-dates'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Config = {
  request: {
    baseURL: 'http://121.5.130.107:8000/',
    imgBaseURL: 'http://121.5.130.107:8080/',
    timeout: 5000,
  },
}

export const Limit = {
  holeBodyMaxLength: 4096,
  holeVoteMaxLength: 5,
  holeVoteOptionLength: 10,
  holeTagsMaxLength: 5,
  holeCommentBodyMaxLength: 1000,
  holeCommentBodyMinLength: 1,
  commentMaxImgLength: 2,
  reportReasonMaxLength: 500,
  reportReasonMinLength: 10,
}

function setupDatePicker() {
  registerTranslation('en-GB', enGB)
}

export function setupGlobalConfig() {
  configurePersistable({
    storage: AsyncStorage,
  })

  setupDatePicker()

  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')
}
