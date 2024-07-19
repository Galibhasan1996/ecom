import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/Slice/Counter/cartSlice'
import { AllColor } from '../../util/Color/AllColor'

const ProductItem = ({ data, filterData }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            {
                data.filter((item) => item.category === filterData).map((item, index) => {
                    return (
                        <View key={index} style={{ borderBottomWidth: 1, borderColor: AllColor.Androidgreen, paddingVertical: scale(5) }}>
                            {/* --------------image-------------- */}
                            <View style={styles.IImage_container}>
                                <Image source={{ uri: item?.image }} style={styles.Image_}></Image>
                            </View>
                            {/* -------------title----------------- */}
                            <Text style={CustomStyle.WhiteColor}>{item.title.substring(0, 20)}</Text>
                            {/* ------------price and rating----------- */}
                            <View style={styles.rating_price}>
                                <View>
                                    <Text style={CustomStyle.WhiteColor}>{item.price}</Text>
                                </View>
                                <View>
                                    <Text style={CustomStyle.WhiteColor}>{item.rating.rate}
                                        <Text style={CustomStyle.WhiteColor}>{" Ratings"}</Text>
                                    </Text>
                                </View>
                            </View>
                            {/* -------------add to cart -------------- */}
                            <View>
                                <TouchableOpacity onPress={() => {
                                    dispatch(addToCart(item))
                                }}>
                                    <Text style={[styles.button, CustomStyle.WhiteBackground, CustomStyle.BlackColor]}>{"Add to Cart"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: scale(10),
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(10)
    },
    Image_: {
        width: scale(150),
        height: scale(150),
        borderRadius: scale(10),
        resizeMode: "contain"
    },
    rating_price: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scale(5)
    },
    button: {
        padding: scale(5),
        borderRadius: scale(5),
        textAlign: "center"
    },
    IImage_container: {
        width: scale(150),
        height: scale(150),
        backgroundColor: "white",
        borderRadius: scale(10),
    }
})