import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../Component/Header/CommonHeader'
import { AllColor } from '../../util/Color/AllColor'
import { scale } from 'react-native-size-matters'
import { useSelector } from 'react-redux'
import { styleConsole } from '../../util/server/Server'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import CommonButton from '../../Component/Button/CommonButton'
import CartItemList from '../../Component/CartItem/CartItemList'



const Cart = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()

    const cartData = useSelector((state) => state.cart.cart)

    const totolPrice = cartData?.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)




    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <ScrollView style={{ paddingHorizontal: scale(10) }}>
                {
                    cartData?.length > 0 ?
                        <View style={styles.main_container}>
                            {/* -----------subtotal---------------- */}
                            <View style={styles.subTotal_Container}>
                                <Text style={[styles.totalPrice, , { color: isDark ? AllColor.white : AllColor.black }]}>{`Subtotal : `}
                                    <Text style={{ color: isDark ? AllColor.white : AllColor.black, fontWeight: "500" }}>{totolPrice}</Text>
                                </Text>
                            </View>
                            {/* ------------EMI Text---------- */}
                            <Text style={{ color: isDark ? AllColor.gray : AllColor.gray }}>{"EMI details Available"}</Text>
                            {/* ------------button------------- */}
                            <View>
                                <CommonButton
                                    BtBackgroundColor={isDark ? AllColor.white : AllColor.black}
                                    ButtonTitle={`Proceed to by (${cartData.length}) items`}
                                    ButtonTitleColor={isDark ? AllColor.black : AllColor.white}
                                    btnWidth={scale(200)}
                                    fontsize={scale(13)}
                                    onPress={() => {
                                        navigaion.navigate("Confirmation")
                                    }}
                                ></CommonButton>
                            </View>
                        </View>
                        :
                        <View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center', }}>
                            <Text>{"Cart is empty"}</Text>
                        </View>
                }
                {/* -----------------cart item list-------------- */}
                <CartItemList data={cartData}></CartItemList>
            </ScrollView>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subTotal_Container: {
        width: responsiveScreenWidth(100),
    },
    totalPrice: {
        fontSize: scale(18),
        marginTop: scale(8),
    },
    main_container: {
        width: "100%",
        borderBottomWidth: scale(1),
        borderColor: AllColor.gray,
    }
})