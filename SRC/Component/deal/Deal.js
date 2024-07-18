import { StyleSheet, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'

const Deal = ({ data }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // -----------navigation-------------
    const navigattion = useNavigation()
    return (
        <>
            <View style={[styles.deals, CustomStyle.WhiteBackground]}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                navigattion.navigate("ProductDetail", { data: item })
                            }}>
                                <Image source={{ uri: item.image }} style={{ width: scale(150), height: scale(150) }}></Image>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </>
    )
}

export default Deal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    deals: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: scale(10),
        justifyContent: 'center',
        paddingVertical: scale(10),
    },
})