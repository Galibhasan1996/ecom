import { StyleSheet, View, Text, ScrollView, TouchableOpacity, setcurrentStepe } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import Stepper from '../stepper/Stepper'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL, showToast, styleConsole } from '../../util/server/Server'
import { AllColor } from '../../util/Color/AllColor'
import CommonButton from '../../Component/Button/CommonButton'
import CommonIcon from '../../Component/Icon/CommonIcon'

const SelectedAddress = ({ address, setselectedAddress, onPress, selectedAddress, setcurrentStepe }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()





    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* ----------select Address------------- */}
            <TouchableOpacity style={styles.select_delivery_address_container} onPress={() => {
                onPress()
            }}>
                <Text style={[styles.select_delivery_address_text, CustomStyle.WhiteColor]}>{"Select Delevery Address"}</Text>
            </TouchableOpacity>
            {/* -------------addresses--------------- */}
            <ScrollView>
                <View>

                    {
                        address?.user?.addresses.map((item, index) => {
                            return (
                                <View key={item._id} style={[styles.main_container, { borderColor: isDark ? AllColor.white : AllColor.black }]}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                        {
                                            selectedAddress?._id === item._id ?
                                                <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                                    setselectedAddress(item)
                                                }}>
                                                    <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={isDark ? AllColor.Androidgreen : AllColor.black}></CommonIcon>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                                    setselectedAddress(item)
                                                }}>
                                                    <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-passive"} color={isDark ? AllColor.white : AllColor.black}></CommonIcon>
                                                </TouchableOpacity>
                                        }
                                        <View >
                                            <View style={styles.userNameContainer}>
                                                <Text style={[styles.userName, CustomStyle.WhiteColor]}>{address.user.name}</Text>
                                                <CommonIcon IconCategoryName={"Ionicons"} IconName={"location-outline"} color={isDark ? AllColor.red : AllColor.red} size={scale(15)}></CommonIcon>
                                            </View>
                                            <Text style={CustomStyle.WhiteColor}>{`City. : ${item.city}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`House No. : ${item.houseNo}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`Landmark : ${item.landmark}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`Mobile No. : ${item.mobileNo}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`PinCode. : ${item.postalCode}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`Street. : ${item.street}`}</Text>
                                            <Text style={CustomStyle.WhiteColor}>{`Country. : ${item.country}`}</Text>
                                            {/* ----------------button------------- */}
                                            <View style={styles.button_container}>
                                                <CommonButton
                                                    BtBackgroundColor={isDark ? AllColor.white : AllColor.black}
                                                    ButtonTitle={"Edit"}
                                                    ButtonTitleColor={isDark ? AllColor.black : AllColor.white}
                                                    marginVertical={scale(5)}
                                                    btnWidth={scale(50)}
                                                    btnHeight={scale(25)}
                                                    fontsize={scale(12)}
                                                    marginRight={scale(5)}
                                                ></CommonButton>

                                                <CommonButton
                                                    BtBackgroundColor={isDark ? AllColor.white : AllColor.black}
                                                    ButtonTitle={"Remove"}
                                                    ButtonTitleColor={isDark ? AllColor.black : AllColor.white}
                                                    marginVertical={scale(5)}
                                                    btnWidth={scale(80)}
                                                    btnHeight={scale(25)}
                                                    fontsize={scale(12)}
                                                    marginRight={scale(5)}
                                                ></CommonButton>

                                                <CommonButton
                                                    BtBackgroundColor={isDark ? AllColor.white : AllColor.black}
                                                    ButtonTitle={"Set as default"}
                                                    ButtonTitleColor={isDark ? AllColor.black : AllColor.white}
                                                    marginVertical={scale(5)}
                                                    btnWidth={scale(110)}
                                                    btnHeight={scale(25)}
                                                    fontsize={scale(12)}
                                                ></CommonButton>


                                            </View>
                                            {
                                                selectedAddress?._id === item._id &&
                                                <CommonButton
                                                    BtBackgroundColor={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                                                    ButtonTitle={"Deliver to this address"}
                                                    ButtonTitleColor={isDark ? AllColor.white : AllColor.white}
                                                    marginVertical={scale(5)}
                                                    btnHeight={scale(25)}
                                                    fontsize={scale(12)}
                                                    marginRight={scale(100)}
                                                    onPress={() => {
                                                        setcurrentStepe(1)
                                                    }}
                                                ></CommonButton>
                                            }

                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default SelectedAddress

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
    address: {
        fontSize: scale(20),
        fontWeight: "500",
        marginVertical: scale(5),
    },
    add_new_address: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: AllColor.gray,
        borderTopWidth: scale(1),
        borderBottomWidth: scale(1),
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
    },
    arrow_container: {
        width: scale(60),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(10),
    },
    userName: {
        fontSize: scale(16),
        fontWeight: "500"
    },
    userNameContainer: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
    },
    main_container: {
        borderWidth: scale(1),
        padding: scale(10),
        borderRadius: scale(5),
        marginBottom: scale(10),
    },
    button_container: {
        flexDirection: "row",
        width: "100%",
    },
    select_address_button: {
        marginRight: scale(10)
    }
})




