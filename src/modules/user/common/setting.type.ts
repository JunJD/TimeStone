export interface UserSetting {
  locale: UserSettingLocale;
  editorFontStyle: UserSettingEditorFontStyle;
  mobileEditorStyle: UserSettingMobileEditorStyle;
}

export enum UserSettingLocale {
  EN = 'en',
  ZH = 'zh',
  VI = 'vi',
}

export enum UserSettingEditorFontStyle {
  NORMAL = 'normal',
  MONO = 'mono',
}
export enum UserSettingMobileEditorStyle {
  NORMAL = 'normal',
  FLOAT = 'float',
}

export type UserSettingKey = keyof UserSetting;

export type UserSettingValue = UserSetting[UserSettingKey];
