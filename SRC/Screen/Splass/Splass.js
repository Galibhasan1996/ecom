import { StyleSheet, Text, View, StatusBar, } from 'react-native'
import React, { useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { AllColor } from '../../util/Color/AllColor'
import { scale } from "react-native-size-matters"
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splass = () => {

    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()


    const getToken = async () => {
        const token = await AsyncStorage.getItem("token")
        if (token) {
            navigaion.replace("Home")
        } else {
            navigaion.replace("Login")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getToken()
        }, 3000);
    }, [])

    return (
        <>
            <StatusBar backgroundColor={isDark ? AllColor.black : AllColor.white} barStyle={isDark ? "light-content" : "dark-content"}></StatusBar>
            <View style={[styles.container, CustomStyle.BlackBackground]}>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount={5} style={[styles.logo, CustomStyle.WhiteColor]}>Emern</Animatable.Text>
            </View>
        </>

    )
}

export default Splass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontSize: scale(30),
        fontWeight: "500"
    }
})