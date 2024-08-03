import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import CommonButton from '../../Component/Button/CommonButton'
import CommonIcon from '../../Component/Icon/CommonIcon'
import { BASE_URL, showToast, styleConsole } from '../../util/server/Server'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanCart } from '../../Redux/Slice/Counter/cartSlice'

const OrderNow = ({ setcurrentStepe, address, selectedAddress, selectedPaymentMethod }) => {

    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // ----------navigation -------------
    const navigation = useNavigation()
    // -----------state------------
    const [userId, setuserId] = useState("");

    const cartData = useSelector((state) => state.cart.cart)

    const dispatch = useDispatch()

    const totolPrice = cartData?.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)


    const getId = async () => {
        const id = await AsyncStorage.getItem("_id")
        setuserId(id)
    }


    const OrderHandle = async () => {
        try {
            orderData = {
                totalPrice: totolPrice,
                cartItem: cartData,
                shippingAddress: selectedAddress,
                paymentMethod: selectedPaymentMethod,
                userId: userId
            }
            const data = await fetch(`${BASE_URL}order/create`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
            const res = await data.json()
            if (res.error) {
                return showToast("error", res.error, res.error)
            } else if (res.message === "Order created successfully") {
                // navigation.navigate("ConfirmOrder")
                dispatch(cleanCart())
                showToast("success", res.message, res.message)
                setcurrentStepe(4)

                // console.log(res);
                // console.log(res.order.products);
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Network request failed') {
                console.error('- INCORRECT URL END POINT -');
            }
            console.log("🚀 ~ file: OrderNow.js:59 ~ OrderHandle ~ error:", error)
        }
    }


    useEffect(() => {
        getId()
    }, [])

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* ----------select Address------------- */}
            <TouchableOpacity style={styles.select_delivery_address_container}>
                <Text style={[styles.select_delivery_address_text, CustomStyle.WhiteColor]}>{"Order Now"}</Text>
            </TouchableOpacity>
            {/* -------------addresses--------------- */}
            <View style={[styles.choose_dilevery_address_option, CustomStyle.WhiteBorder]}>
                <View>
                    <Text style={{ color: isDark ? AllColor.Androidgreen : AllColor.Androidgreen }}>{"Save 5% and naver run out"}</Text>
                    <Text style={{ color: isDark ? AllColor.gray : AllColor.gray }}>{"Turn on auto deliveries"}</Text>
                </View>
                <TouchableOpacity>
                    <CommonIcon IconCategoryName={"AntDesign"} IconName={"caretright"} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>
            {/* -----------------name-------------- */}
            <View style={[styles.choose_dilevery_address_option_, CustomStyle.WhiteBorder]}>
                <Text style={[{ color: isDark ? AllColor.white : AllColor.black },]}>{`Shipping to - ${address?.user.name}`}</Text>

                <View style={styles.totolPrice}>
                    <Text style={CustomStyle.grayColor}>{"Items"}</Text>
                    <Text style={CustomStyle.grayColor}>{totolPrice}</Text>
                </View>

                <View style={styles.totolPrice}>
                    <Text style={CustomStyle.grayColor}>{"Delivery"}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        <CommonIcon IconCategoryName={"FontAwesome6"} IconName={"indian-rupee-sign"} size={scale(10)} color={isDark ? AllColor.gray : AllColor.gray}></CommonIcon>
                        <Text style={[CustomStyle.grayColor, { marginHorizontal: scale(5) }]}>{"0"}</Text>
                    </View>
                </View>

                <View style={styles.totolPrice}>
                    <Text style={[CustomStyle.WhiteColor, { fontWeight: "500", fontSize: scale(15) }]}>{"Order Total"}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                        <CommonIcon IconCategoryName={"FontAwesome6"} IconName={"indian-rupee-sign"} size={scale(10)} color={isDark ? AllColor.white : AllColor.gray}></CommonIcon>
                        <Text style={[CustomStyle.WhiteColor, { marginHorizontal: scale(5), fontWeight: "500", fontSize: scale(15) }]}>{totolPrice}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.choose_dilevery_address_option_, CustomStyle.WhiteBorder]}>

                <View >
                    <Text style={CustomStyle.grayColor}>{"Pay With"}</Text>
                    <Text style={isDark ? CustomStyle.WhiteColor : CustomStyle.BlackColor}>{"Pay on Delivery (Cash) "}</Text>
                </View>

            </View>


            <CommonButton
                BtBackgroundColor={AllColor.Androidgreen}
                ButtonTitle={"Place Your Order"}
                ButtonTitleColor={isDark ? AllColor.white : AllColor.white}
                btnHeight={scale(25)}
                fontsize={scale(12)}
                onPress={() => {
                    OrderHandle()
                }}
            ></CommonButton>

        </View>
    )
}

export default OrderNow

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    select_delivery_address_container: {
        width: responsiveScreenWidth(100),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
    },
    select_delivery_address_text: {
        fontSize: scale(15),
        fontWeight: "500"
    },
    choose_dilevery_address_option: {
        width: responsiveScreenWidth(95),
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        marginBottom: scale(10),
        borderWidth: scale(1),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    select_address_button: {
        marginRight: scale(10)
    },
    choose_dilevery_address_option_: {
        width: responsiveScreenWidth(95),
        alignSelf: 'center',
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        marginBottom: scale(10),
        borderWidth: scale(1),
    },
    totolPrice: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})









