import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const CommonButton = ({ ButtonTitle, onPress, BtBackgroundColor, ButtonTitleColor, marginVertical, btnWidth, btnHeight, fontsize, marginLeft, marginRight, disabled }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <TouchableOpacity disabled={disabled} style={[styles.container,
        {
            backgroundColor: BtBackgroundColor ? BtBackgroundColor : CustomStyle.WhiteBackground,
            marginVertical: marginVertical ? marginVertical : scale(20),
            width: btnWidth ? btnWidth : responsiveScreenWidth(50),
            height: btnHeight ? btnHeight : scale(40),
            marginRight: marginRight ? marginRight : scale(0),
            marginLeft: marginLeft ? marginLeft : scale(0)
        }
        ]} onPress={() => {
            onPress()
        }}>
            <Text style={[styles.buttontitle,
            {
                color: ButtonTitleColor ? ButtonTitleColor : CustomStyle.BlackColor,
                fontSize: fontsize ? fontsize : scale(15)

            }
            ]}>{ButtonTitle}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontitle: {
        fontWeight: "500",
    }
})