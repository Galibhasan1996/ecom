import { StyleSheet, Text, View, TouchableOpacity, Alert, } from 'react-native'
import React, { useContext, } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CommonIcon from '../../Component/Icon/CommonIcon'
import { AllColor } from '../../util/Color/AllColor'
import RazorpayCheckout from 'react-native-razorpay';
import { BASE_URL, MainContext, razorpayKey, showToast, styleConsole } from '../../util/server/Server'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cleanCart } from '../../Redux/Slice/Counter/cartSlice'
import { useNavigation } from '@react-navigation/native'
const PaymentMethod = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    const cartData = useSelector((state) => state.cart.cart)

    const navigation = useNavigation()

    const dispatch = useDispatch()
    const totolPrice = cartData.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)


    const { currentStepe, setcurrentStepe, id, selectedAddress, selectedPaymentMethod, address, setselectedAddress, setselectedPaymentMethod } = useContext(MainContext);







    const pay = async () => {
        try {
            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/GCgMLl2.jpeg',
                currency: 'INR',
                key: razorpayKey, // Your api key
                amount: totolPrice * 100,
                name: 'Mohammad Galib',
                prefill: {
                    email: 'void@razorpay.com',
                    contact: '9191919191',
                    name: 'Razorpay Software'
                },
                theme: { color: '#F37254' }
            }
            const datarazorpay = await RazorpayCheckout.open(options)
            console.log("🚀 ~ file: PaymentMethod.js:54 ~ pay ~ datarazorpay:", datarazorpay)


            orderData = {
                totalPrice: totolPrice,
                cartItem: cartData,
                shippingAddress: selectedAddress,
                paymentMethod: selectedPaymentMethod,
                userId: id
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
                navigation.navigate("BottomTapNavigator")
                dispatch(cleanCart())
                showToast("success", res.message, res.message)

                // console.log(res);
                // console.log(res.order.products);
            }
        } catch (error) {
            console.log("🚀 ~ file: PaymentMethod.js:83 ~ pay ~ error:", error)
        }

    }

    const createTwoButtonAlert = () =>
        Alert.alert('UPI/Debit Cart', 'Pay Online', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => pay() },
        ]);
    return (
        <>
            <View style={[styles.choose_dilevery_address_option, CustomStyle.WhiteBorder]}>
                <View>
                    {
                        selectedPaymentMethod === "cash" ?
                            <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                setselectedPaymentMethod("cash")
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={selectedPaymentMethod === "cash" ? AllColor.Androidgreen : AllColor.gray} size={scale(16)}></CommonIcon>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                setselectedPaymentMethod("cash")
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-passive"} color={selectedPaymentMethod === "cash" ? AllColor.Androidgreen : AllColor.gray} size={scale(16)}></CommonIcon>
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{"Cash on Delivery"}</Text>
                </View>
            </View>
            {/* --------------------------- */}
            <View style={[styles.choose_dilevery_address_option, CustomStyle.WhiteBorder]}>
                <View>
                    {
                        selectedPaymentMethod === "UPI" ?
                            <TouchableOpacity onMagicTap={createTwoButtonAlert()} style={styles.select_address_button} onPress={() => {
                                setselectedPaymentMethod("UPI")
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-active"} color={selectedPaymentMethod === "UPI" ? AllColor.Androidgreen : AllColor.gray} size={scale(16)}></CommonIcon>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.select_address_button} onPress={() => {
                                setselectedPaymentMethod("UPI")
                            }}>
                                <CommonIcon IconCategoryName={"Fontisto"} IconName={"radio-btn-passive"} color={selectedPaymentMethod === "UPI" ? AllColor.Androidgreen : AllColor.gray} size={scale(16)}></CommonIcon>
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{"UPI / Credit or debit card"}</Text>
                </View>
            </View>
        </>

    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    choose_dilevery_address_option: {
        width: responsiveScreenWidth(95),
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: scale(10),
        paddingHorizontal: scale(10),
        paddingVertical: scale(8),
        marginBottom: scale(10),
        borderWidth: scale(1),
        alignItems: 'center',
    },
    select_address_button: {
        marginRight: scale(10)
    }
})