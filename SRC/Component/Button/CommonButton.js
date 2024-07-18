import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const CommonButton = ({ ButtonTitle, onPress, BtBackgroundColor, ButtonTitleColor, marginVertical }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: BtBackgroundColor ? BtBackgroundColor : CustomStyle.WhiteBackground, marginVertical: marginVertical ? marginVertical : scale(20) }]} onPress={() => {
            onPress()
        }}>
            <Text style={[styles.buttontitle, { color: ButtonTitleColor ? ButtonTitleColor : CustomStyle.BlackColor }]}>{ButtonTitle}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(50),
        alignSelf: 'center',
        height: scale(40),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontitle: {
        fontWeight: "500",
        fontSize: scale(15)
    }
})