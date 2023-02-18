import { Dispatch, SetStateAction } from 'react';
import { CookieAttributes } from 'js-cookie';

export type UseViewportSize = {
  width?: number;
  height?: number;
};

export type UseAsyncStatus = 'Idle' | 'Pending' | 'Success' | 'Error';

export interface UseAsyncExecuteFunction {
  variables?: any;
  onSuccess?: (response: any, status: UseAsyncStatus) => void;
  onError?: (error: any, status: UseAsyncStatus) => void;
}

export interface UseAsyncOptions extends UseAsyncExecuteFunction {
  immediate?: boolean;
}

export type UseAsyncAsyncFunction = (variables?: any) => Promise<any>;

export type UseAsyncReturn = [
  (args?: UseAsyncExecuteFunction) => void,
  { response: any; status: UseAsyncStatus; error: any }
];

export type UseEventListenerOptions = {
  eventName: string;
  handler: Function;
  element?: EventTarget;
};

export interface UseStorageOptions<DefaultValues> {
  storageName: string;
  defaultValues?: DefaultValues;
  nullValue?: boolean;
}

export type UseStorageReturn<DefaultValues> = [
  DefaultValues,
  Dispatch<SetStateAction<DefaultValues | any>>,
  () => void
];

export interface UseCookiesOptions<DefaultValues>
  extends UseStorageOptions<DefaultValues>,
    CookieAttributes {}

export {
  CookieAttributes,
  Converter,
  CookieReadConverter,
  CookieWriteConverter,
  CookiesStatic,
} from 'js-cookie';
