export class CallText {
  test: string;
}

export class CallModel {
  guid: string;
  path: string;
  phone: string;
  callText: CallText[];
  isAtWork: boolean;
  isReady: boolean;
  isUnloaded: boolean;
}
