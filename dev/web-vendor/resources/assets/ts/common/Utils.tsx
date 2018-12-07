import CustomSnackbar from './CustomSnackbar/CustomSnackbar';
import { Snackbar } from '@material-ui/core';
import React from 'react';

/**
 * Convert object to query string: page=1&limit=20
 * 
 * @param params 
 * @param glue 
 * @param delimiter 
 * 
 * @return string
 */
export const objectToQueryString = (params: object | any, glue: string = ':', delimiter: string = ';') => {
    return Object.keys(JSON.parse(JSON.stringify(params))).map(key => key + `${glue}` + params[key]).join(delimiter);
};

/**
 * Check key in object not empty value
 * 
 * @param params 
 * @param glue 
 * @param delimiter 
 * 
 * @return boolean
 */
export const isEmptyKeyInObject = (params: object) => {
    if (Object.keys(JSON.parse(JSON.stringify(params))).length) {
        return true;
    }

    return false;
};

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const showError = (clientError: any, errorInfo: any, key: string) => {
    if (clientError[key] && !isEmpty(clientError[key])) {
        return clientError[key];
    }

    if (errorInfo.errors[key] && Array.isArray(errorInfo.errors[key])) {
        return errorInfo.errors[key][0];
    }

    return '';
}

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const isEmpty = (value: any) => {
    return (value === undefined || value === null || value === '');
}


export const createSnackBarMess = (isValidate: boolean | undefined, isError: boolean, showMessage: boolean, handleCloseMessage:any) => {
    var snack;
    if (isError) {
        snack = <CustomSnackbar
            onClose={handleCloseMessage}
            variant="error"
            message="Server Error!"
        />
    }

    if (isValidate) {
        snack = <CustomSnackbar
        onClose={handleCloseMessage}
            variant="warning"
            message="Nội dung nhập có lỗi, vui lòng kiểm tra lại!"
        />
    }

    if (!isValidate && !isError) {
        snack = <CustomSnackbar
        onClose={handleCloseMessage}
            variant="info"
            message="Đã lưu thành công"
        />
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={showMessage}
            autoHideDuration={6000}
            onClose={handleCloseMessage}>
            {snack}
        </Snackbar>)
}
