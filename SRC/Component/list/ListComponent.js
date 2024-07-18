import { StyleSheet, Text, Image, TouchableOpacity, ScrollView, } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'

const ListComponent = ({ list, width, height, imageWidth, imageHeight, borderRadius }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <>
            {/* -------------list---------- */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    list.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.list_container, { width: scale(width), height: scale(height) }]}>
                                <Image source={{ uri: item.image }} style={[styles.list_image, { width: scale(imageWidth), height: scale(imageHeight), borderRadius: scale(borderRadius) }]}></Image>
                                <Text style={[styles.list_text, CustomStyle.WhiteColor]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

export default ListComponent

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
        borderRadius: scale(30),
    },
    list_text: {
        marginTop: scale(3),
    }
})