import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import CommonButton from '../../Component/Button/CommonButton'
import PaymentMethod from '../paymentMethod/PaymentMethod'

const Payment = ({ setcurrentStepe, selectedPaymentMethod, setselectedPaymentMethod, selectedAddress }) => {
    // console.log("🚀 ~ file: Payment.js:12 ~ Payment ~ selectedAddress:", selectedAddress)

    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    // ----------state-------------



    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* ----------select Address------------- */}
            <TouchableOpacity style={styles.select_delivery_address_container}>
                <Text style={[styles.select_delivery_address_text, CustomStyle.WhiteColor]}>{"Select Your Payment Method"}</Text>
            </TouchableOpacity>
            {/* -------------addresses--------------- */}


            <PaymentMethod
                setselectedPaymentMethod={setselectedPaymentMethod}
                selectedPaymentMethod={selectedPaymentMethod}
                selectedAddress={selectedAddress}
            ></PaymentMethod>


            <CommonButton
                disabled={selectedPaymentMethod === "" && true}
                BtBackgroundColor={selectedPaymentMethod === "" ? AllColor.gray : AllColor.Androidgreen}
                ButtonTitle={"Continue"}
                ButtonTitleColor={isDark ? AllColor.white : AllColor.white}
                marginVertical={scale(5)}
                btnHeight={scale(25)}
                fontsize={scale(12)}
                onPress={() => {
                    setcurrentStepe(3)
                }}
            ></CommonButton>

        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    select_delivery_address_container: {
        width: responsiveScreenWidth(100),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
    },
    select_delivery_address_text: {
        fontSize: scale(15),
        fontWeight: "500"
    },
    choose_dilevery_address_option: {
        width: responsiveScreenWidth(95),
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8),
        marginBottom: scale(10),
        borderWidth: scale(1),
        alignItems: 'center',
    },
    select_address_button: {
        marginRight: scale(10)
    }
})










