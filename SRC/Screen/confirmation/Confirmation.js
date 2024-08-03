import { StyleSheet, View, Text, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import Stepper from '../stepper/Stepper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL, showToast, styleConsole } from '../../util/server/Server'
import SelectedAddress from '../selectedAddress/SelectedAddress'
import Delivery from '../delivery/Delivery'
import Payment from '../payment/Payment'
import OrderNow from '../orderNow/OrderNow'
import ConfirmOrder from '../confirmOrder/ConfirmOrder'

const Confirmation = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark, height, width } = useCustomStyle()
    // --------navigation------------
    const navigaion = useNavigation()
    // -------------state-------------
    const [currentStepe, setcurrentStepe] = useState(0);
    const [address, setaddress] = useState([]);
    const [selectedAddress, setselectedAddress] = useState("");
    // console.log("🚀 ~ file: Confirmation.js:23 ~ Confirmation ~ selectedAddress:", selectedAddress)

    const [selectedPaymentMethod, setselectedPaymentMethod] = useState("");


    const [id, setid] = useState('');


    const getId = async () => {
        const id = await AsyncStorage.getItem("_id")
        setid(id)
    }

    const getUserAddress = async () => {
        try {
            const data = await fetch(`${BASE_URL}auth/getUserAddress/${id}`)

            const res = await data.json()


            if (res.error) {
                return showToast("error", res.error, res.error)
            } else {
                setaddress(res)
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Network request failed') {
                console.error('- INCORRECT URL END POINT -');
            }
            console.log("🚀 ~ file: Confirmation.js:50 ~ getUserAddress ~ error:", error)
        }
    }


    useEffect(() => {
        getId()
        getUserAddress()
    }, [])

    return (
        <View style={[styles.container, CustomStyle.BlackBackground]}>
            {/* --------stepper------------- */}
            <Stepper currentStepe={currentStepe}></Stepper>

            {/* -------------addresses--------------- */}
            {
                currentStepe === 0 &&
                <SelectedAddress
                    address={address}
                    setselectedAddress={setselectedAddress}
                    onPress={() => {
                        getUserAddress()
                    }}
                    selectedAddress={selectedAddress}
                    setcurrentStepe={setcurrentStepe}
                ></SelectedAddress>

            }
            {
                currentStepe === 1 &&
                <Delivery
                    setcurrentStepe={setcurrentStepe}
                ></Delivery>
            }
            {
                currentStepe === 2 &&
                <Payment
                    setcurrentStepe={setcurrentStepe}
                    setselectedPaymentMethod={setselectedPaymentMethod}
                    selectedPaymentMethod={selectedPaymentMethod}
                    selectedAddress={selectedAddress}
                ></Payment>
            }
            {
                currentStepe === 3 &&
                <OrderNow
                    setcurrentStepe={setcurrentStepe}
                    address={address}
                    selectedAddress={selectedAddress}
                    selectedPaymentMethod={selectedPaymentMethod}
                ></OrderNow>
            }
            {
                currentStepe === 4 &&
                <ConfirmOrder

                ></ConfirmOrder>
            }
        </View>
    )
}

export default Confirmation

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})