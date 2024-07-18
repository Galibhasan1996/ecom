import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { showToast, styleConsole } from '../../util/server/Server'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import CommonHeader from '../../Component/Header/CommonHeader'
import { AllColor } from '../../util/Color/AllColor'
import { scale } from 'react-native-size-matters'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import CommonIcon from '../../Component/Icon/CommonIcon'
import CommonButton from '../../Component/Button/CommonButton'

const ProductDetail = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    const [addWishList, setAddWishList] = useState(false);

    // -----------route--------------
    const { color, image, offer, oldPrice, price, size, title, carouselImages } = useRoute().params.data
    console.log(carouselImages);

    return (
        <View style={[styles.container, CustomStyle.WhiteBackground]}>
            {/* ------------common header--------------- */}
            <CommonHeader
                placeholder={"Search for products, brands and more"}
                LeftIconCategoryName={"EvilIcons"}
                LeftIconName={"search"}
                Leftcolor={isDark ? AllColor.black : AllColor.white}
                RightIconCategoryName={"Feather"}
                RightIconName={"mic"}
                Rightcolor={AllColor.black}
                Lsize={scale(30)}
                Rsize={scale(20)}
                placeholderTextColor={isDark ? AllColor.gray : AllColor.gray}
            ></CommonHeader>
            <ScrollView>
                {/* ------------main product------------ */}
                <View>
                    <FlatList
                        data={carouselImages}
                        horizontal
                        pagingEnabled
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <Image source={{ uri: item }} style={{ width: responsiveScreenWidth(100), height: scale(350), resizeMode: "contain" }}></Image>
                                    {/* -------------offer-------------- */}
                                    {
                                        offer ?
                                            <View style={styles.offer_conainer}>
                                                <Text style={CustomStyle.WhiteColor}>{offer}</Text>
                                            </View>
                                            :
                                            <View >
                                                <Text style={CustomStyle.WhiteColor}>{"20 %"}</Text>
                                                <Text style={CustomStyle.WhiteColor}>{"OFF"}</Text>
                                            </View>
                                    }
                                    {/* --------------share icon-------------- */}
                                    <TouchableOpacity style={styles.shere_button}>
                                        <CommonIcon IconCategoryName={"Ionicons"} IconName={"share-social-outline"} color={AllColor.black}></CommonIcon>
                                    </TouchableOpacity>
                                    {/* ---------------------wishlist icon-------------------- */}
                                    <TouchableOpacity style={styles.heart_button} onPress={() => {
                                        setAddWishList(!addWishList)
                                    }}>
                                        {
                                            addWishList ? <CommonIcon IconCategoryName={"AntDesign"} IconName={"heart"} color={addWishList ? AllColor.Androidgreen : AllColor.black}></CommonIcon>
                                                :
                                                <CommonIcon IconCategoryName={"AntDesign"} IconName={"hearto"} color={AllColor.black}></CommonIcon>
                                        }
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    ></FlatList>
                    {/* -----------product title-------------- */}
                    <View style={styles.product_title}>
                        <Text style={[styles.product_title_text, CustomStyle.BlackColor]}>{title}</Text>
                        {/* ------------product price---------------- */}
                        <View style={[styles.product_title, { flexDirection: "row", alignItems: 'center', }]}>
                            <CommonIcon IconCategoryName={"MaterialIcons"} IconName={"currency-rupee"} color={AllColor.black} size={scale(13)}></CommonIcon>
                            <Text style={[styles.product_title_text, CustomStyle.BlackColor, { fontSize: scale(15), fontWeight: "500" }]}>{price}</Text>
                        </View>
                    </View>
                    {/* -----------product color and size ------------- */}

                    <View style={styles.product_color_size}>
                        <Text style={[CustomStyle.BlackColor, { fontWeight: "500", paddingVertical: scale(5) }]}>{`Color : ${color}`}</Text>
                        <Text style={[CustomStyle.BlackColor, { fontWeight: "500", paddingVertical: scale(5) }]}>{`Size : ${size}`}</Text>
                    </View>
                    {/* --------total price-------------- */}
                    <View >
                        <Text style={[CustomStyle.BlackColor, { fontWeight: "500", paddingVertical: scale(5), paddingHorizontal: scale(15) }]}>{`Total Price : 4500`}</Text>
                    </View>
                    {/* ---------delivery details------------ */}
                    <Text style={[CustomStyle.AndroidColor, { fontWeight: "500", paddingVertical: scale(5), paddingHorizontal: scale(15) }]}>{"FREE delivery Tomorrow by 3 PM Order within 10hrs 30 mins "}</Text>
                    {/* ----------------address-------------- */}
                    <View style={styles.address_view}>
                        <CommonIcon IconCategoryName={"Ionicons"} IconName={"location-outline"} color={AllColor.black} size={scale(20)}></CommonIcon>
                        <Text style={[CustomStyle.BlackColor, { fontWeight: "500" }]}>{"Deliver to Mohammad - Hazrat Nagar Garhi - 244301"}</Text>
                    </View>
                    {/* --------------stock-------------- */}
                    <View >
                        <Text style={[CustomStyle.AndroidColor, { fontWeight: "500", paddingHorizontal: scale(15) }]}>{"IN Stock"}</Text>
                    </View>
                    {/* -------------Add to cart button ---------------- */}
                    <CommonButton
                        ButtonTitle={"Add to Cart"}
                        BtBackgroundColor={AllColor.black}
                        ButtonTitleColor={AllColor.white}
                        marginVertical={scale(5)}
                        onPress={() => { showToast("success", "Added To Cart", "Added To Cart") }}
                    ></CommonButton>
                    {/* ----------buy now button------------ */}
                    <CommonButton
                        ButtonTitle={"Buy Now"}
                        BtBackgroundColor={AllColor.black}
                        ButtonTitleColor={AllColor.white}
                        marginVertical={scale(5)}
                        onPress={() => { showToast("success", "Buy now", "Buy now") }}
                    ></CommonButton>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    offer_conainer: {
        backgroundColor: 'red',
        width: scale(40),
        height: scale(40),
        borderRadius: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: scale(30),
        left: scale(30),
    },
    shere_button: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: scale(30),
        right: scale(30),
        backgroundColor: "#d9d9d9"
    },
    heart_button: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: scale(5),
        left: scale(30),
        backgroundColor: "#d9d9d9"
    },
    product_title: {
        width: responsiveScreenWidth(100),
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        textAlign: "justify"
    },
    product_title_text: {
        fontWeight: "500"
    },
    product_color_size: {
        width: responsiveScreenWidth(100),
        paddingVertical: scale(10),
        borderColor: AllColor.gray,
        borderBottomWidth: scale(1),
        borderTopWidth: scale(1),
        paddingHorizontal: scale(15),
    },
    address_view: {
        flexDirection: "row",
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        paddingVertical: scale(10),
    }
})