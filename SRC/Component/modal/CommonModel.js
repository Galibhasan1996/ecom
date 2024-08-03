import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import CommonIcon from '../Icon/CommonIcon'
import { useNavigation } from '@react-navigation/native'

const CommonModel = ({ visible, setvisible, UserAddresses, selectedAddress, setselectedAddress, setnameFromModal }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    const navigation = useNavigation()
    // ----------state---------------


    return (
        <Modal transparent visible={visible} animationType='slide'>
            <View style={[styles.container, CustomStyle.BlackBackground]}>
                {/* -----------choose location text------------- */}
                <View style={styles.choose_location_container_}>
                    <View>
                        <Text style={[styles.choose_location_text, CustomStyle.WhiteColor]}>{"Choose your Location"}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setvisible(false)
                    }}>
                        <CommonIcon IconCategoryName={"AntDesign"} IconName={"close"} color={isDark ? AllColor.white : AllColor.black} ></CommonIcon>
                    </TouchableOpacity>
                </View>
                {/* -----------choose delevery text------------- */}
                <View style={styles.choose_location_container}>
                    <Text style={[styles.choose_location_text_, CustomStyle.grayColor]}>{"Select a delevery location to see product availability and delivery options"}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    {
                        UserAddresses?.user?.addresses.map((item, index) => {
                            return (
                                <TouchableOpacity key={item._id} style={[styles.main_container, { borderColor: selectedAddress === item ? AllColor.Androidgreen : isDark ? AllColor.white : AllColor.black, backgroundColor: selectedAddress === item ? AllColor.rgbaGreen : null }]} onPress={() => {
                                    setselectedAddress(item)
                                    setnameFromModal(UserAddresses.user.name)
                                    setTimeout(() => {
                                        setvisible(false)
                                    }, 3000);
                                }}>
                                    <View style={styles.userNameContainer}>
                                        <Text style={[styles.userName, CustomStyle.WhiteColor]}>{UserAddresses.user.name}</Text>
                                        <CommonIcon IconCategoryName={"Ionicons"} IconName={"location-outline"} color={isDark ? AllColor.red : AllColor.red} size={scale(15)}></CommonIcon>
                                    </View>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.city}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.houseNo}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.landmark}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.mobileNo}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.postalCode}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.street}`}</Text>
                                    <Text style={[CustomStyle.WhiteColor, { fontSize: (scale(11)) }]}>{`${item.country}`}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }
                    {/* -----------select address------------- */}
                    <TouchableOpacity style={styles.pick_up_point} onPress={() => {
                        setvisible(false)
                        navigation.navigate('AddAddress')
                    }}>
                        <Text style={[CustomStyle.grayColor, { textAlign: "center" }]}>{"Add an address or pick-up point"}</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* --------------pincode----------------- */}
                <View style={styles.pincode}>
                    <CommonIcon IconCategoryName={"Ionicons"} IconName={"location-outline"} color={isDark ? AllColor.white : AllColor.black} size={scale(15)}></CommonIcon>
                    <Text style={[CustomStyle.WhiteColor, { marginHorizontal: scale(10) }]}>{"Enter an Indian pincode"}</Text>
                </View>

                {/* --------------current location----------------- */}
                <View style={styles.pincode}>
                    <CommonIcon IconCategoryName={"MaterialIcons"} IconName={"location-searching"} color={isDark ? AllColor.white : AllColor.black} size={scale(15)}></CommonIcon>
                    <Text style={[CustomStyle.WhiteColor, { marginHorizontal: scale(10) }]}>{"Use my current location"}</Text>
                </View>

                {/* --------------pincode----------------- */}
                <View style={styles.pincode}>
                    <CommonIcon IconCategoryName={"SimpleLineIcons"} IconName={"globe"} color={isDark ? AllColor.white : AllColor.black} size={scale(15)}></CommonIcon>
                    <Text style={[CustomStyle.WhiteColor, { marginHorizontal: scale(10) }]}>{"Deliver Outside India"}</Text>
                </View>

            </View>
        </Modal>
    )
}

export default CommonModel

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        height: scale(400),
        position: "absolute",
        bottom: scale(0),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        paddingVertical: scale(20),
        paddingHorizontal: scale(20),
    },
    choose_location_container: {
        width: "100%",
        paddingVertical: scale(5),
    },
    choose_location_container_: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    choose_location_text: {
        fontWeight: "500",
        fontSize: scale(15)
    },
    choose_location_text_: {
        fontWeight: "500",
        fontSize: scale(12),
        paddingVertical: scale(5),
    },
    pick_up_point: {
        borderWidth: scale(1),
        borderColor: AllColor.gray,
        width: scale(150),
        height: scale(150),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(5),
        padding: scale(10),
    },
    pincode: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: scale(10),
    },
    main_container: {
        borderWidth: scale(1),
        padding: scale(10),
        borderRadius: scale(5),
        width: scale(150),
        height: scale(150),
        marginRight: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: scale(14),
        fontWeight: "500"
    },
    userNameContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
    },
})