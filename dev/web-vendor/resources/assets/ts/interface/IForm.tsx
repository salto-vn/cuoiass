export interface IFormState {
    model: any,
    isSubmitDisabled: boolean,
    clientError: any,
    isHandleEvent?: boolean,
    isValidate?: boolean | undefined,
    isError: boolean,
    isLoading?:boolean,
    showMessage?: boolean,
    validateMessage: any,
    alert ?: any
}