/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
  }
}

declare namespace App {
  interface ApiResp<T> {
    success: boolean,
    data: T,
    errorMsg: string,
  }

  interface UserInfo {
    id: number,
    nickname: string,
    avatar: string,
    copperCoin: number,
    silverCoin: number,
    goldCoin: number,
  }

  interface MahjongRoundInfo {
    recorderId: number,
    winerIds: number[],
    loserIds: number[],
    winerCase: number,
    baseFan: number,
    fanList: number[],
  }

  interface MahjongRoundLog {
    userId: number,
    userName: string,
    userAvatar: string,
    score: number,
  }
}
