import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native'
import React, { useState } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import CommonButton from '../../Component/Button/CommonButton'
import CommonIcon from '../../Component/Icon/CommonIcon'

const Delivery = ({ setcurrentStepe }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    // ----------state-------------
    const [option, setoption] = useState(false);




    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* ----------select Address------------- */}
            <TouchableOpacity style={styles.select_delivery_address_container}>
                <Text style={[styles.select_delivery_address_text, CustomStyle.WhiteColor]}>{"Choose your delivery options"}</Text>
            </TouchableOpacity>
            {/* -------------addresses--------------- */}


            <View style={[styles.choose_dilevery_address_option, CustomStyle.WhiteBorder]}>
                <View>
                    {
                        option === true ?
                            <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                setoption(!option)
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={isDark ? AllColor.Androidgreen : AllColor.black}></CommonIcon>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                setoption(!option)
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-passive"} color={isDark ? AllColor.gray : AllColor.gray}></CommonIcon>
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text style={{ color: isDark ? AllColor.Androidgreen : AllColor.Androidgreen }}>{"Tomorrow by 10pm - "}</Text>
                    <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{"Free Delivery with your prime membership"}</Text>
                </View>
            </View>


            <CommonButton
                disabled={option === false ? true : false}
                BtBackgroundColor={option === false ? AllColor.gray : AllColor.Androidgreen}
                ButtonTitle={"Continue"}
                ButtonTitleColor={isDark ? AllColor.white : AllColor.white}
                marginVertical={scale(5)}
                btnHeight={scale(25)}
                fontsize={scale(12)}
                onPress={() => {
                    setcurrentStepe(2)
                }}
            ></CommonButton>

        </View>
    )
}

export default Delivery

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
        paddingVertical: scale(10),
        marginBottom: scale(10),
        borderWidth: scale(1),
        alignItems: 'center',
    },
    select_address_button: {
        marginRight: scale(10)
    }
})







