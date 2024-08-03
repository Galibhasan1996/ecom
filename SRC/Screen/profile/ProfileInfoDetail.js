import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

const ProfileInfoDetail = ({ data, onPress }) => {

    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation();
    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            <View style={styles.main_container}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={[styles.button, CustomStyle.WhiteBackground]} onPress={() => {
                                if (index === 3) {
                                    onPress()
                                }
                            }}>
                                <Text style={CustomStyle.BlackColor}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default ProfileInfoDetail

const styles = StyleSheet.create({
    button: {
        width: scale(160),
        height: scale(30),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_container: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
        flexWrap: "wrap",
        paddingVertical: scale(10),
        justifyContent: 'center',
    }

})