export enum AlertStatus {
  success = "success",
  warning = "warning",
  error = "error",
  info = "info",
}

export interface InfosTranscoding {
  message: {
    content: string;
    type?: AlertStatus;
  };
  percent: number;
  isTranscoding: boolean;
}

export interface AudioElement {
  src: string;
  name: string;
  tempo: number;
}

export interface Tempo {
  value: number;
  active: boolean
}
