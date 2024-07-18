import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import CommonIcon from '../Icon/CommonIcon'
import { AllColor } from '../../util/Color/AllColor'

const CommonInput = ({ size, color, IconName, IconCategoryName, ScreenBackgroundColor, placeholder,
    placeholderTextColor, onChangeText, keyboardType, value, InputBackGroundColor, InputHeader,
    LeftIcon = false, secureTextEntry, LeftIconCategoryName, LeftIconName, }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, { backgroundColor: ScreenBackgroundColor }]}>
            {
                InputHeader &&
                <View>
                    <Text style={[styles.inputheader, { color: isFocused ? AllColor.Androidgreen : AllColor.gray }]}>{InputHeader}</Text>
                </View>
            }
            {/* ------------input------------- */}
            <View style={[styles.main_Input_container, { backgroundColor: InputBackGroundColor, borderWidth: scale(2), borderColor: isFocused ? color : AllColor.gray }]} >
                <View>
                    <CommonIcon IconCategoryName={IconCategoryName} IconName={IconName} color={isFocused ? color : AllColor.gray} size={size}></CommonIcon>
                </View>
                <View>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        value={value}
                        style={[styles.main_Input, CustomStyle.BlackColor,]}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    ></TextInput>
                </View>
                {
                    LeftIcon &&
                    <TouchableOpacity >
                        <CommonIcon IconCategoryName={LeftIconCategoryName} IconName={LeftIconName} color={isFocused ? color : AllColor.gray} size={scale(20)}></CommonIcon>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CommonInput

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
    },
    Logo_container: {
        width: responsiveScreenWidth(100),
        alignItems: 'center',
    },
    Logo_: {
        width: scale(100),
        height: scale(100),
    },
    main_Input_container: {
        flexDirection: "row",
        alignItems: 'center',
        width: responsiveScreenWidth(90),
        alignSelf: 'center',
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        marginVertical: scale(5)
    },
    inputheader: {
        fontWeight: "500",
        marginLeft: scale(6)
    },
    main_Input: {
        width: responsiveScreenWidth(70),
        paddingLeft: scale(10),
        marginRight: scale(3)
    }
})