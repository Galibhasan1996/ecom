import { StyleSheet, Text, Image, TouchableOpacity, ScrollView, View, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/Slice/Counter/cartSlice'

const List_2 = ({ data, width, height, imageWidth, imageHeight, borderRadius }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation------------
    const navigation = useNavigation()
    // ----------disptch------------
    const dispatch = useDispatch()
    return (
        <>
            {/* -------------list---------- */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.list_container, { width: scale(width), height: scale(height) }]} onPress={() => {
                                navigation.navigate("ProductDetail", { data: item })
                            }}>
                                <Image source={{ uri: item.image }} style={[styles.list_image, { width: scale(imageWidth), height: scale(imageHeight), borderRadius: scale(borderRadius) }]}></Image>
                                <View style={styles.offer}>
                                    <Text style={[styles.list_text, CustomStyle.WhiteColor]}>{"Upto "}</Text>
                                    <Text style={[styles.list_text, CustomStyle.WhiteColor]}>{item.offer}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

export default List_2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    list_container: {
        marginVertical: scale(10),
        marginHorizontal: scale(2),
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_image: {
        // borderRadius: scale(30),
        // resizeMode: "contain"
    },
    list_text: {
        marginTop: scale(3),
    },
    offer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "red",
        width: "90%",
        justifyContent: 'center',
        marginVertical: scale(8),
        borderRadius: scale(5),
    }
})