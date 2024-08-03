import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import { scale } from 'react-native-size-matters';

const ConfirmOrder = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // ----------navigation -------------
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("BottomTapNavigator")
        }, 1300);
    }, [])

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <LottieView source={(require("../../util/jsonFile/thumbs.json"))}
                autoPlay
                loop
                style={styles.lottie}
            ></LottieView>
            <LottieView source={(require("../../util/jsonFile/sparkle.json"))}
                autoPlay
                loop
                style={styles.lottie_sparkle}
            ></LottieView>
            <Text style={[styles.confirmOrderText, CustomStyle.WhiteColor]}>{"Your order has been Received"}</Text>
        </View>
    )
}

export default ConfirmOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: scale(150),
        height: scale(150),
    },
    lottie_sparkle: {
        width: scale(400),
        height: scale(400),
        position: "absolute",
    },
    confirmOrderText: {
        fontWeight: "500",
        fontSize: scale(18),
        marginTop: scale(20),
    }
})