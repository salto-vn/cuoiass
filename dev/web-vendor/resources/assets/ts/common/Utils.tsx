import CustomSnackbar from './CustomSnackbar/CustomSnackbar';
import { Snackbar } from '@material-ui/core';
import React from 'react';
import moment = require('moment');
import { bookingStatusList } from './Resources';

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
    var rs = Object.keys(JSON.parse(JSON.stringify(params))).map((key, index) => {
        if (!isEmpty(params[key])) {
            return key + `${glue}` + params[key];
        }
    }).filter((obj) => {
        return obj !== undefined;
    });
    return rs.join(delimiter);
};

/**
 * format search/item_name:value;item_name1:value1
 * @param query 
 */
export const searchQueryStringToArray = (query: string) => {
    if (isEmpty(query)) {
        return null;
    }
    var rs = query.split(";").map(value => { return value.split(":") });
    return rs.reduce(function (prev: any, curr: any) { prev[curr[0]] = curr[1]; return prev; }, {})
}

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
        return false;
    }

    return true;
};

/**
 * 
 * @param value 
 * 
 * @return boolean
 */
export const showError = (clientError: any, errorInfo: any, key: string) => {
    if ((clientError[key] === undefined && errorInfo.errors[key] === undefined) && !Array.isArray(errorInfo.errors[key])) { // Initial
        return 'init';
    }

    if (clientError[key] && !isEmpty(clientError[key])) { //Client error
        return clientError[key];
    }

    if (errorInfo.errors[key] && Array.isArray(errorInfo.errors[key])) { // Server error message
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


export const isDateCorrectFormat = (dateString: string, format: string) => {
    return moment(dateString, format, true).isValid()
}

export const parseDateFormat = (dateString: string, format: string) => {
    if (dateString === "")
        return dateString;
    if (isDateCorrectFormat(dateString, format))
        return dateString;
    return moment(dateString).format(format);
}

export const createSnackBarMess = (isValidate: boolean | undefined, isError: boolean, showMessage: boolean, handleCloseMessage: any) => {
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


/**
 * get status by key
 * @param key 
 */
export const getStatus = (key: string) => {

    return bookingStatusList.map(value => {
        if (value.key === key)
            return value.value + "";
    })
}

/**
 * local:vi-VN
 * value: number
 */
export const convertCurrency = (local: string, value: number) => {
    return new Intl.NumberFormat(local, { style: 'currency', currency: 'VND' }).format(value);
}
