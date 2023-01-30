export enum TypeMessage {
  BUTTON_LOOP_STATUS = "BUTTON_LOOP_STATUS",
  ALWAYS_LOOP = "ALWAYS_LOOP",
}

export interface SettingMessage {
  type: keyof typeof TypeMessage;
  checked: boolean;
}
