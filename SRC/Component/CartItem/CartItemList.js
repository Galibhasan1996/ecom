import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import CommonIcon from '../Icon/CommonIcon'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incementQuantity, removeFromCart } from '../../Redux/Slice/Counter/cartSlice'

const CartItemList = ({ data }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------dispatch-------------
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <View style={[CustomStyle.BlackBackground, { paddingBottom: scale(10) }]}>
                {
                    data?.map((item, index) => {
                        return (
                            <View key={index} style={styles.container}>

                                <View style={[styles.image_container, { backgroundColor: AllColor.white }]}>
                                    <View>
                                        <Image source={{ uri: item.image }} style={styles.product_image}></Image>
                                    </View>
                                    <View>
                                        <Text style={CustomStyle.WhiteColor}>{item.title.substring(0, 100)}</Text>
                                        <Text style={[CustomStyle.WhiteColor, { fontWeight: "500", fontSize: scale(15) }]}>{item.price}</Text>
                                        <Image source={{ uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png" }} style={{ width: 30, height: 30 }}></Image>
                                        <Text style={CustomStyle.WhiteColor}>{"In stock"}</Text>
                                    </View>

                                </View>
                                {/* ---------------button----------- */}
                                <View style={styles.button_}>
                                    {/* ---------delete and minus-------------- */}
                                    {
                                        item.quantity <= 1 ?
                                            <TouchableOpacity style={[styles.delete_button, CustomStyle.WhiteBackground]} onPress={() => {
                                                dispatch(decrementQuantity(item))
                                            }}>
                                                <CommonIcon IconCategoryName={"MaterialCommunityIcons"} IconName={"delete"} color={isDark ? AllColor.black : AllColor.white}></CommonIcon>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={[styles.delete_button, CustomStyle.WhiteBackground]} onPress={() => {
                                                dispatch(decrementQuantity(item))
                                            }}>
                                                <CommonIcon IconCategoryName={"Entypo"} IconName={"minus"} color={isDark ? AllColor.black : AllColor.white}></CommonIcon>
                                            </TouchableOpacity>
                                    }
                                    {/* -------------quantity------------- */}
                                    <View style={[styles.quantity, CustomStyle.BlackBackground]}>
                                        <Text style={{ color: isDark ? AllColor.white : AllColor.black }}>{item.quantity}</Text>
                                    </View>
                                    {/* -----------add button------------ */}
                                    <TouchableOpacity style={[styles.add_button, CustomStyle.WhiteBackground]} onPress={() => {
                                        dispatch(incementQuantity(item))
                                    }}>
                                        <CommonIcon IconCategoryName={"Fontisto"} IconName={"plus-a"} color={isDark ? AllColor.black : AllColor.white} size={scale(18)}></CommonIcon>
                                    </TouchableOpacity>
                                    {/* ------------direct delete------------ */}
                                    <TouchableOpacity style={[styles.delete_button_, CustomStyle.WhiteBorder]} onPress={() => {
                                        dispatch(removeFromCart(item))
                                    }}>
                                        <Text style={CustomStyle.WhiteColor}>{"Delete"}</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* ---------------save for latter--------------- */}
                                <View style={styles.save_for_latter}>
                                    <TouchableOpacity style={[styles.delete_button__, CustomStyle.WhiteBorder]}>
                                        <Text style={CustomStyle.WhiteColor}>{"Save for latter"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.delete_button__, CustomStyle.WhiteBorder]}>
                                        <Text style={CustomStyle.WhiteColor}>{"See More Like This"}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>

    )
}

export default CartItemList

const styles = StyleSheet.create({
    container: {
        marginTop: scale(10),
    },
    image_container: {
        width: scale(140),
        height: scale(140),
        borderRadius: scale(10),
        flexDirection: "row",
    },
    product_image: {
        width: scale(130),
        height: scale(130),
        resizeMode: "contain",
        marginHorizontal: scale(10),
    },
    button_: {
        width: responsiveScreenWidth(100),
        marginTop: scale(10),
        flexDirection: "row",
        alignItems: "center",
    },
    delete_button: {
        width: scale(30),
        height: scale(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: scale(5),
        borderTopLeftRadius: scale(5),
    },
    add_button: {
        width: scale(30),
        height: scale(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: scale(5),
        borderTopRightRadius: scale(5),
    },
    quantity: {
        height: scale(30),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(10),
    },
    delete_button_: {
        borderRadius: scale(5),
        borderWidth: scale(1),
        height: scale(28),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(10),
        marginHorizontal: scale(10),
    },
    save_for_latter: {
        width: responsiveScreenWidth(100),
        marginTop: scale(10),
        flexDirection: "row",
        alignItems: "center",
    },
    delete_button__: {
        borderRadius: scale(5),
        borderWidth: scale(1),
        height: scale(28),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(10),
        marginRight: scale(10),
    },
})