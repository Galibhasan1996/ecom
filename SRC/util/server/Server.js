import Toast from "react-native-toast-message";

export const PORT = 170
export const BASE_URL = `http://192.168.163.${PORT}:3000/api/v1/`






export const styleConsole = (message, WhatCall, data) => {
    const now = new Date().toLocaleTimeString();
    console.log(`\x1b[33m--- ${message} ${now} ---\x1b[0m  -- \x1b[31m${WhatCall}\x1b[0m  --- `, data);
}



export const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2
    })
}



