import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useCustomStyle } from '../../../Hooks/Style/useCutomStyle'
import { scale } from 'react-native-size-matters'
import CommonIcon from '../../../Component/Icon/CommonIcon'
import { AllColor } from '../../../util/Color/AllColor'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BASE_URL, showToast, styleConsole } from '../../../util/server/Server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import CommonButton from '../../../Component/Button/CommonButton'
import { ScrollView } from 'react-native-gesture-handler'

const AddAddress = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation()

    // ------------state------------------
    const [UserAddresses, setUserAddresses] = useState([]);


    const [id, setid] = useState('');

    const getId = async () => {
        const id = await AsyncStorage.getItem("_id")
        setid(id)
    }

    const getUserAddress = async () => {
        try {
            const data = await fetch(`${BASE_URL}auth/getUserAddress/${id}`)

            const res = await data.json()

            if (res.error) {
                return showToast("error", res.error, res.error)
            } else {
                setUserAddresses(res)
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Network request failed') {
                console.error('- Incorrect URL END POINT');
            }
            console.log("🚀 ~ file: AddAddress.js:46 ~ getUserAddress ~ error:", error)
        }
    }


    useEffect(() => {
        getId()
        getUserAddress()
    }, [])

    useFocusEffect(
        useCallback(() => {
            getUserAddress()
        }, [])
    )

    return (
        <>
            <View style={[styles.container, CustomStyle.BlackBackground]}>

                <Text style={[styles.address, CustomStyle.WhiteColor]}>{"Your Addresses"}</Text>
                {/* ---------add new address---------------- */}
                <View style={styles.add_new_address}>
                    <Text style={CustomStyle.WhiteColor} onPress={() => {
                        getUserAddress()
                    }}>{"Add a new address"}</Text>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => {
                        navigation.navigate("NewAddress")
                    }}>
                        <View style={[styles.arrow_container, CustomStyle.grayBackground]}>
                            <CommonIcon IconCategoryName={"MaterialCommunityIcons"} IconName={"ray-start-arrow"} color={isDark ? AllColor.white : AllColor.black}></CommonIcon>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* -------------addresses--------------- */}
                <ScrollView>
                    <View>

                        {
                            UserAddresses?.user?.addresses.map((item, index) => {
                                return (
                                    <View key={item._id} style={[styles.main_container, { borderColor: isDark ? AllColor.white : AllColor.black }]}>
                                        <View style={styles.userNameContainer}>
                                            <Text style={[styles.userName, CustomStyle.WhiteColor]}>{UserAddresses.user.name}</Text>
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
                                            ></CommonButton>

                                            <CommonButton
                                                BtBackgroundColor={isDark ? AllColor.white : AllColor.black}
                                                ButtonTitle={"Remove"}
                                                ButtonTitleColor={isDark ? AllColor.black : AllColor.white}
                                                marginVertical={scale(5)}
                                                btnWidth={scale(80)}
                                                btnHeight={scale(25)}
                                                fontsize={scale(12)}
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
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default AddAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(10),
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
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    }
})