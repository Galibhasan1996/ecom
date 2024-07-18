import { Dimensions, useColorScheme } from "react-native"
import { AllColor } from "../../util/Color/AllColor"
export const useCustomStyle = () => {
    const isDark = useColorScheme() === "dark"
    const isWhite = useColorScheme() === "light"

    const CustomStyle = {
        BlackBackground: {
            backgroundColor: isDark ? AllColor.black : AllColor.white
        },
        WhiteColor: {
            color: isDark ? AllColor.white : AllColor.black
        },
        WhiteBackground: {
            backgroundColor: isDark ? AllColor.white : AllColor.black
        },
        BlackColor: {
            color: isDark ? AllColor.black : AllColor.white
        },
        BlackBorder: {
            borderColor: isDark ? AllColor.black : AllColor.white
        },
        WhiteBorder: {
            borderColor: isDark ? AllColor.white : AllColor.black
        },
        forText: {
            backgroundColor: isDark ? "rgba(138,43,226,0.3)" : AllColor.Cyan
        },
        grayColor: {
            color: isDark ? AllColor.gray : AllColor.gray
        },
        AndroidColor: {
            color: isDark ? AllColor.Androidgreen : AllColor.Androidgreen
        },
        grayBackground: {
            backgroundColor: isDark ? AllColor.gray : AllColor.gray
        },
        tintWhiteColor: {
            tintColor: isDark ? AllColor.white : AllColor.black
        },
        AndroidBackgroundColor: {
            backgroundColor: isDark ? AllColor.Androidgreen : AllColor.Androidgreen
        },
    }

    const height = Dimensions.get("screen").height
    const width = Dimensions.get("screen").width


    return { CustomStyle, isDark, isWhite, height, width }
}