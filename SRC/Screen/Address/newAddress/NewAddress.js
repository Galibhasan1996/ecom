import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useCustomStyle } from '../../../Hooks/Style/useCutomStyle'
import { AllColor } from '../../../util/Color/AllColor'
import { scale } from 'react-native-size-matters'
import CommonInput from '../../../Component/input/CommonInput'
import CommonButton from '../../../Component/Button/CommonButton'
import { BASE_URL, showToast, styleConsole } from '../../../util/server/Server'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const NewAddress = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()

    // --------navigation------------
    const navigation = useNavigation()

    // --------------state----------------
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [houseNo, sethouseNo] = useState('');
    const [street, setstreet] = useState('');
    const [landmark, setLandmark] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [country, setCountry] = useState('');
    const [id, setid] = useState('');


    const getUserId = async () => {
        const userId = await AsyncStorage.getItem("_id")
        return setid(userId)
    }


    useEffect(() => {
        getUserId()
    }, [])


    const AddNewAddress = async () => {
        try {
            const data = await fetch(`${BASE_URL}auth/addAddress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userId": id,
                    "city": city,
                    "name": name,
                    "houseNo": houseNo,
                    "street": street,
                    "landmark": landmark,
                    "postalCode": postalCode,
                    "mobileNo": mobileNo,
                    "country": country
                })
            })
            const res = await data.json()
            if (res.error) {
                return showToast("error", res.error, res.error)
            }

            if (res.message === "Address Added Successfully") {
                showToast("success", res.message, res.message)
                navigation.goBack()
                setCountry("")
                setCity("")
                setName("")
                sethouseNo("")
                setstreet("")
                setLandmark("")
                setpostalCode("")
                setmobileNo("")
            }
        } catch (error) {
            console.log("🚀 ~ file: NewAddress.js:79 ~ AddNewAddress ~ error:", error)
        }
    }

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <Text style={[styles.address, CustomStyle.WhiteColor]}>{"Add a new Address"}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* ------------country-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"Fontisto"}
                    IconName={"world-o"}
                    placeholder={"Country"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Country"}
                    size={scale(20)}
                    value={country}
                    keyboardType={"default"}
                    onChangeText={(text) => setCountry(text)}
                ></CommonInput>
                {/* ------------city-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"MaterialCommunityIcons"}
                    IconName={"city-variant-outline"}
                    placeholder={"City"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"City"}
                    size={scale(20)}
                    value={city}
                    keyboardType={"default"}
                    onChangeText={(text) => setCity(text)}
                ></CommonInput>

                {/* ------------name-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"Entypo"}
                    IconName={"user"}
                    placeholder={"Enter your name"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Full name ( First and Last name )"}
                    size={scale(20)}
                    value={name}
                    keyboardType={"default"}
                    onChangeText={(text) => setName(text)}
                ></CommonInput>

                {/* ------------mobile-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"FontAwesome5"}
                    IconName={"mobile-alt"}
                    placeholder={"Mobile no"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Mobile Number"}
                    size={scale(20)}
                    value={mobileNo}
                    keyboardType={"phone-pad"}
                    onChangeText={(text) => setmobileNo(text)}
                ></CommonInput>

                {/* ------------house no -------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"Ionicons"}
                    IconName={"home-outline"}
                    placeholder={"Flat,Colony,House no."}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Flat,Colony,House no."}
                    size={scale(20)}
                    value={houseNo}
                    keyboardType={"phone-pad"}
                    onChangeText={(text) => sethouseNo(text)}
                ></CommonInput>

                {/* ------------street-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"Fontisto"}
                    IconName={"holiday-village"}
                    placeholder={"Area,Street,Sector,Village"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Area,Street,Sector,Village"}
                    size={scale(20)}
                    value={street}
                    keyboardType={"default"}
                    onChangeText={(text) => setstreet(text)}
                ></CommonInput>

                {/* ------------landmark-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"FontAwesome6"}
                    IconName={"landmark"}
                    placeholder={"Landmark"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Landmark"}
                    size={scale(20)}
                    value={landmark}
                    keyboardType={"default"}
                    onChangeText={(text) => setLandmark(text)}
                ></CommonInput>

                {/* ------------pincode-------------- */}
                <CommonInput
                    ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                    IconCategoryName={"Ionicons"}
                    IconName={"location-outline"}
                    placeholder={"pincode"}
                    color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                    placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                    InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                    InputHeader={"Pincode"}
                    size={scale(20)}
                    value={postalCode}
                    keyboardType={"phone-pad"}
                    onChangeText={(text) => setpostalCode(text)}
                ></CommonInput>

                {/* ---------------button-------------- */}
                <CommonButton
                    ButtonTitle={"Add Address"}
                    BtBackgroundColor={AllColor.white}
                    ButtonTitleColor={AllColor.black}
                    onPress={() => { AddNewAddress() }}
                ></CommonButton>
            </ScrollView>
        </View>
    )
}

export default NewAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    address: {
        fontSize: scale(20),
        fontWeight: "500",
        marginVertical: scale(5),
    }
})