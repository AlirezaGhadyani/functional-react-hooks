import { Dispatch, SetStateAction } from 'react';
export declare type UseViewportSize = {
    width?: number;
    height?: number;
};
export declare type UseAsyncStatus = 'Idle' | 'Pending' | 'Success' | 'Error';
export interface UseAsyncExecuteFunction {
    variables?: any;
    onSuccess?: (response: any, status: UseAsyncStatus) => void;
    onError?: (error: any, status: UseAsyncStatus) => void;
}
export interface UseAsyncOptions extends UseAsyncExecuteFunction {
    immediate?: boolean;
}
export declare type UseAsyncAsyncFunction = (variables?: any) => Promise<any>;
export declare type UseAsyncReturn = [(args?: UseAsyncExecuteFunction) => void, {
    response: any;
    status: UseAsyncStatus;
    error: any;
}];
export declare type UseEventListenerOptions = {
    eventName: string;
    handler: Function;
    element?: EventTarget;
};
export declare type UseStorageOptions<DefaultValues> = {
    storageName: string;
    defaultValues?: DefaultValues;
    nullValue?: boolean;
};
export declare type UseStorageReturn<DefaultValues> = [DefaultValues, Dispatch<SetStateAction<DefaultValues | any>>, () => void];
