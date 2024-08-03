import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

const UserAllOrder = ({ data }) => {
    console.log("🚀 ~ file: UserAllOrder.js:7 ~ UserAllOrder ~ data:", data)


    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation();
    return (
        <View style={[CustomStyle.BlackBackground, styles.container]}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                {
                    data.map((order) => (
                        <TouchableOpacity style={[styles.main_container, CustomStyle.WhiteBackground]} key={order._id} activeOpacity={0.9}>
                            {/* Render the order information here */}
                            {order.products?.map((product) => (
                                <View style={{ marginVertical: scale(10), }} key={product._id}>
                                    <Image
                                        source={{ uri: product.image }}
                                        style={{ width: 100, height: 100, resizeMode: "contain" }}
                                    />
                                </View>
                            ))}
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default UserAllOrder

const styles = StyleSheet.create({
    main_container: {
        marginTop: 10,
        padding: scale(10),
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    container: {
        marginBottom: scale(120),
        paddingBottom: scale(15),
    }
})