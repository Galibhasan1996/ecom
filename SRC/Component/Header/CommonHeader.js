import { StyleSheet, TextInput, View, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CommonIcon from '../Icon/CommonIcon'
import { AllColor } from '../../util/Color/AllColor'

const CommonHeader = ({ RightIconCategoryName, RightIconName, Rightcolor, LeftIconCategoryName, LeftIconName, Leftcolor, placeholder, Lsize, Rsize, value, onChangeText, placeholderTextColor }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    return (
        <View style={[styles.container, CustomStyle.WhiteBackground]}>
            <View style={[styles.input_container, CustomStyle.BlackBackground]}>
                <View style={styles.seach_Icon}>
                    <CommonIcon IconCategoryName={LeftIconCategoryName} IconName={LeftIconName} color={Leftcolor} size={Lsize} ></CommonIcon>
                </View>
                <View>
                    <TextInput
                        placeholder={placeholder}
                        style={[styles.main_input, { color: isDark ? AllColor.black : AllColor.white }]}
                        placeholderTextColor={placeholderTextColor}
                        value={value}
                        onChangeText={onChangeText}
                    ></TextInput>
                </View>
            </View>
            <View>
                <CommonIcon IconCategoryName={RightIconCategoryName} IconName={RightIconName} color={Rightcolor} size={Rsize}></CommonIcon>
            </View>
        </View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: scale(10),
    },
    input_container: {
        width: responsiveScreenWidth(85),
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: scale(10),
        marginVertical: scale(8),
        height: scale(35),
        borderRadius: scale(10),
    },
    main_input: {
        width: responsiveScreenWidth(73),
        borderBottomRightRadius: scale(10),
        borderTopRightRadius: scale(10),
    },
    seach_Icon: {
        height: "100%"
    }
})