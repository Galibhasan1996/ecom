import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import React, { useState, } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import { stepData } from '../../util/Data/StaticData.'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'

const Stepper = ({ currentStepe }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()


    return (
        <>
            <View style={styles.main_container}>
                {
                    stepData?.map((step, index) => (
                        <View style={{ justifyContent: "center", alignItems: "center", }} key={index}>

                            <View style={[styles.main_button, index < currentStepe && { backgroundColor: AllColor.Androidgreen }]}>
                                {
                                    index < currentStepe ?
                                        (
                                            <Text style={[{ fontSize: 16, fontWeight: "bold", }, CustomStyle.WhiteColor]}>&#10003;</Text>
                                        )
                                        :
                                        (
                                            <Text style={[{ fontSize: 16, fontWeight: "bold", }, CustomStyle.WhiteColor]}>{index + 1}</Text>
                                        )
                                }
                            </View>
                            <Text style={[{ textAlign: "center", marginTop: scale(5) }, CustomStyle.WhiteColor]}>{step.title}</Text>
                        </View>
                    ))
                }
            </View>
        </>

    )
}

export default Stepper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_container: {
        flexDirection: "row",
        width: responsiveScreenWidth(100),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        paddingVertical: scale(10)
    },
    main_button: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: AllColor.gray,
        justifyContent: "center",
        alignItems: "center",
    }
})

