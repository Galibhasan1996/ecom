import { StyleSheet, Text, Image, TouchableOpacity, ScrollView, View, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'

const List_2 = ({ data, }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // ------------navigation------------
    const navigation = useNavigation()
    return (
        <>
            {/* -------------list---------- */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    data.map((item, index) => {
                        return (
                            <View key={index} style={styles.product_detail_contailer} >
                                <TouchableOpacity style={styles.product_detail_contailer_inside} onPress={() => {
                                    navigation.navigate("ProductDetail", { data: item })
                                }}>
                                    <Image source={{ uri: item.image }} style={[styles.list_image,]}></Image>
                                </TouchableOpacity>
                                <View style={styles.offer}>
                                    <Text style={[styles.list_text, CustomStyle.WhiteColor]}>{"Upto "}</Text>
                                    <Text style={[styles.list_text, CustomStyle.WhiteColor]}>{item.offer}</Text>
                                </View>
                            </View>
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
    list_image: {
        resizeMode: "contain",
        width: scale(170),
        height: scale(170),
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
    },
    product_detail_contailer: {
        width: scale(190),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        marginVertical: scale(10),
        marginHorizontal: scale(2),
        borderRadius: scale(10),
    },
    product_detail_contailer_inside: {
        width: scale(190),
        height: scale(190),
        backgroundColor: "white",
        borderRadius: scale(10),
        alignItems: 'center',
    }

})