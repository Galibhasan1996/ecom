import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native'
import React, { useState, } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'
import { responsiveScreenWidth } from "react-native-responsive-dimensions"
import CommonInput from '../../Component/input/CommonInput'
import { AllColor } from '../../util/Color/AllColor'
import CommonButton from '../../Component/Button/CommonButton'
import { BASE_URL, showToast, styleConsole } from '../../util/server/Server'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from 'react-redux'
import { setUserId } from '../../Redux/Slice/userId/userIdSlice'


const Login = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    // ------------state------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    // ------------dispatch-------------
    const dispatch = useDispatch()

    const validation = () => {
        if (email == "") {
            return showToast("error", "Please Enter Email", "Please Enter Email")
        }
        if (password == "") {
            return showToast("error", "Please Enter Password", "Please Enter Password")
        }
        else {
            Login()
        }
    }
    const Login = () => {
        try {
            fetch(`${BASE_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
                .then((res) => res.json())
                .then((data) => {
                    // styleConsole("🚀 ~ file: Login.js:44 ~ response:", "data", data)

                    if (data.error === "user not verified") {
                        showToast("error", "Check Your Email", data.error)

                    } else if (data.error) {
                        showToast("error", data.error, data.error)
                    }
                    else if (data.message === "Login Successfully") {
                        AsyncStorage.setItem("token", data.token)
                        AsyncStorage.setItem("_id", data.user._id)
                        setEmail('')
                        setPassword('')
                        navigaion.navigate("BottomTapNavigator")
                    }

                })
                .catch((error) => {
                    styleConsole("🚀 ~ file: Login.js:68 ~ Login ~ error:", error)
                });
        } catch (error) {
            styleConsole("🚀 ~ file: Login.js:71 ~ Login ~ error:", error)
        }
    };

    return (
        <>
            <View style={[styles.container, CustomStyle.BlackBackground]}>
                {/* ----------logo------------ */}
                <View style={styles.Logo_container}>
                    <Image source={require("../../util/image/logo.png")} style={[styles.Logo_, CustomStyle.tintWhiteColor]} />
                </View>
                <View style={styles.Login_text}>
                    <Text style={CustomStyle.WhiteColor}>{`Login to your account`}</Text>
                </View>
                <ScrollView>
                    {/* ------------email-------------- */}
                    <CommonInput
                        ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                        IconCategoryName={"Fontisto"}
                        IconName={"email"}
                        placeholder={"Enter your Email"}
                        color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                        placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                        InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                        InputHeader={"Email"}
                        size={scale(20)}
                        value={email}
                        keyboardType={"email-address"}
                        onChangeText={(text) => setEmail(text)}
                    ></CommonInput>
                    {/* ------------password-------------- */}
                    <CommonInput
                        ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                        IconCategoryName={"MaterialIcons"}
                        IconName={"lock-outline"}
                        placeholder={"Enter your password"}
                        color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                        placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                        InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                        InputHeader={"Password"}
                        size={scale(23)}
                        value={password}
                        keyboardType={"phone-pad"}
                        onChangeText={(text) => setPassword(text)}

                    ></CommonInput>
                    {/* ------forgot text------------ */}
                    <View style={styles.forgot_container}>
                        <View>
                            <Text style={CustomStyle.grayColor}>{"keep me logged in"}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={[CustomStyle.AndroidColor, { fontWeight: "500" }]}>{"Forgot Password"}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* ------------login button-------------- */}
                    <CommonButton
                        ButtonTitle={"Login"}
                        BtBackgroundColor={AllColor.white}
                        ButtonTitleColor={AllColor.black}
                        onPress={() => {
                            validation()
                        }}
                    ></CommonButton>
                    {/* ---------have account-------------- */}
                    <View style={styles.forgot_container}>
                        <View>
                            <Text>{"Don't have an account?"}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigaion.navigate("Signup")
                        }}>
                            <Text style={{ fontWeight: "500", color: AllColor.Androidgreen }}>{"Sign Up"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        </>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, Logo_container: {
        width: responsiveScreenWidth(100),
        alignItems: 'center',
    },
    Logo_: {
        width: scale(100),
        height: scale(100),
    },
    Login_text: {
        width: responsiveScreenWidth(100),
        alignItems: 'center',
        marginVertical: scale(15)
    },
    forgot_container: {
        flexDirection: "row",
        width: responsiveScreenWidth(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: scale(5),
        paddingHorizontal: scale(20)
    }
})