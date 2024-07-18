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



const Signup = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    // ------------state------------
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [dateOfBirth, setdateOfBirth] = useState("");

    const validation = () => {
        if (name == "") {
            return showToast("error", "Please Enter name", "Please Enter name")
        }
        if (email == "") {
            return showToast("error", "Please Enter email", "Please Enter email")
        }
        if (password == "") {
            return showToast("error", "Please Enter password", "Please Enter password")
        }
        if (mobile == "") {
            return showToast("error", "Please Enter mobile", "Please Enter mobile")
        }
        if (dateOfBirth == "") {
            return showToast("error", "Please Enter dateOfBirth", "Please Enter dateOfBirth")
        }
        else {
            Register()
        }
    }
    const Register = () => {
        try {
            fetch(`${BASE_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password, name: name, mobile: mobile, dateOfBirth: dateOfBirth })
            })
                .then((res) => res.json())
                .then((data) => {
                    styleConsole("🚀 ~ file: Signup.js:57 ~ response:", "data", data)

                    if (data.error === "user already exists") {
                        showToast("error", "User already exists", "User already exists")

                    } else if (data.error) {
                        showToast("error", data.error, data.error)
                    }
                    else if (data.message === "Register Successfully") {
                        showToast("success", "Register Successfully", "Register Successfully")
                        setEmail('')
                        setPassword('')
                        setname('')
                        setmobile('')
                        setdateOfBirth('')
                        navigaion.navigate("Login")
                    }

                })
                .catch((error) => {
                    styleConsole("🚀 ~ file: Signup.js:77 ~ Register ~ error:", error)
                });
        } catch (error) {
            styleConsole("🚀 ~ file: Signup.js:80 ~ Register ~ error:", error)
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
                    <Text style={CustomStyle.WhiteColor}>{`Register to your account`}</Text>
                </View>
                <ScrollView>

                    {/* ------------name-------------- */}
                    <CommonInput
                        ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                        IconCategoryName={"Fontisto"}
                        IconName={"person"}
                        placeholder={"Enter your name"}
                        color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                        placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                        InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                        InputHeader={"Name"}
                        size={scale(20)}
                        value={name}
                        keyboardType={"default"}
                        onChangeText={(text) => setname(text)}
                    ></CommonInput>
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
                    {/* ------------mobile-------------- */}
                    <CommonInput
                        ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                        IconCategoryName={"Fontisto"}
                        IconName={"mobile-alt"}
                        placeholder={"Enter your Mobile"}
                        color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                        placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                        InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                        InputHeader={"Mobile"}
                        size={scale(20)}
                        value={mobile}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => setmobile(text)}
                    ></CommonInput>
                    {/* ------------date-------------- */}
                    <CommonInput
                        ScreenBackgroundColor={isDark ? AllColor.black : AllColor.white}
                        IconCategoryName={"FontAwesome5"}
                        IconName={"birthday-cake"}
                        placeholder={"Enter your date of birth"}
                        color={isDark ? AllColor.Androidgreen : AllColor.Androidgreen}
                        placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
                        InputBackGroundColor={isDark ? AllColor.white : AllColor.black}
                        InputHeader={"Date OF Birth"}
                        size={scale(20)}
                        value={dateOfBirth}
                        keyboardType={"number-pad"}
                        onChangeText={(text) => setdateOfBirth(text)}
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
                        ButtonTitle={"Register"}
                        onPress={() => {
                            validation()
                        }}
                    ></CommonButton>
                    {/* ---------have account-------------- */}
                    <View style={styles.forgot_container}>
                        <View>
                            <Text>{"Already have an account?"}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigaion.navigate("Login")
                        }}>
                            <Text style={{ fontWeight: "500", color: AllColor.Androidgreen }}>{"Login"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default Signup

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


