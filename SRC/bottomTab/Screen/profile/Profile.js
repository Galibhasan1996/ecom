import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useCustomStyle } from '../../../Hooks/Style/useCutomStyle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import CommonIcon from '../../../Component/Icon/CommonIcon'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../../util/Color/AllColor'
import { BASE_URL, showToast, styleConsole } from '../../../util/server/Server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { profileData } from '../../../util/Data/StaticData.'
import ProfileInfoDetail from '../../../Screen/profile/ProfileInfoDetail'
import UserAllOrder from '../../../Screen/order/UserAllOrder'

const Profile = () => {

    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                backgroundColor: AllColor.Cyan,
            },
            headerLeft: () =>
            (
                <Image
                    style={{ width: scale(120), height: scale(120), resizeMode: "contain", marginLeft: scale(10) }}
                    source={{ uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png", }}>
                </Image>
            ),
            headerRight: () =>
            (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginRight: 12, height: "100%", }}>
                    <CommonIcon IconCategoryName={"Ionicons"} IconName="notifications-outline" color={AllColor.black} />

                    <CommonIcon IconCategoryName={"AntDesign"} IconName="search1" color={AllColor.black} />
                </View>
            ),

        });
    }, []);

    const [id, setid] = useState("");
    console.log("🚀 ~ file: Profile.js:46 ~ Profile ~ id:", id)


    const [userProfile, setuserProfile] = useState([]);
    const [userOrder, setUserOrder] = useState([]);
    styleConsole("🚀 ~ file: Profile.js:49 ~ Profile ~ userOrder:", "Order", JSON.stringify(userOrder))



    const getId = async () => {
        const id = await AsyncStorage.getItem("_id")

        setid(id)
    }


    const logout = async () => {
        try {
            const token = await AsyncStorage.removeItem("token")
            console.log("🚀 ~ file: Profile.js:61 ~ logout ~ token:", token)
            navigation.replace("Login")

        } catch (error) {
            console.log("🚀 ~ file: Profile.js:62 ~ logout ~ error:", error)
        }


    }

    const getUserProfile = async () => {
        try {
            const data = await fetch(`${BASE_URL}auth/userProfile/${id}`)

            const res = await data.json()


            if (res.error) {
                return showToast("error", res.error, res.error)
            } else {
                setuserProfile(res)
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Network request failed') {
                console.error('- INCORRECT URL END POINT -');
            }
            console.log("🚀 ~ file: Profile.js:100 ~ getUserProfile ~ error:", error)
        }
    }
    const getUserOrder = async () => {
        try {
            const data = await fetch(`${BASE_URL}auth/userOrder/${id}`)

            const res = await data.json()


            if (res.error) {
                return showToast("error", res.error, res.error)
            } else {
                setUserOrder(res.order)
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Network request failed') {
                console.error('- INCORRECT URL END POINT -');
            }
            console.log("🚀 ~ file: Profile.js:100 ~ getUserOrder ~ error:", error)
        }
    }

    useEffect(() => {
        getId()
        getUserOrder()
        getUserProfile()
    }, [])



    return (
        <>
            <View style={[styles.container, CustomStyle.BlackBackground]}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', }} onPress={() => {
                    getUserProfile()
                    getUserOrder()
                }}>
                    <Text style={[styles.userProfile, CustomStyle.WhiteColor]}>{"Welcome :"}</Text>
                    <Text style={[styles.userProfile, CustomStyle.WhiteColor]}>{`${userProfile?.user?.name === undefined ? "User" : userProfile?.user?.name}`}</Text>
                </TouchableOpacity>

                <ProfileInfoDetail
                    data={profileData}
                    onPress={() => {
                        logout()
                    }}
                ></ProfileInfoDetail>

                <UserAllOrder data={userOrder}></UserAllOrder>
            </View>
        </>

    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userProfile: {
        marginVertical: scale(10),
        marginHorizontal: scale(5),
        fontSize: scale(15),
        fontWeight: "500",
    }
})