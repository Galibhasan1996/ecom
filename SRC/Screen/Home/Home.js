import { StyleSheet, Text, View, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle'
import { useNavigation } from '@react-navigation/native'
import CommonHeader from '../../Component/Header/CommonHeader'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/Color/AllColor'
import CommonIcon from '../../Component/Icon/CommonIcon'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { list, imagesForCrousel, deals, offers } from '../../util/Data/StaticData.'
import ListComponent from '../../Component/list/ListComponent'
import Crousel from '../../AppNavigator/Crousel/Crousel'
import Deal from '../../Component/deal/Deal'
import List_2 from '../../Component/List2/List_2'
import axios from 'axios'
import ProductItem from '../../Component/product/ProductItem'
import { styleConsole } from '../../util/server/Server'
import { useSelector } from 'react-redux'



const Home = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation()

    // ---------------state---------
    const [product, setproduct] = useState([]);

    const data = useSelector((state) => state.cart.cart)
    styleConsole("from slice", "data", data)




    const getProduct = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products")
            // styleConsole("Fake Store Api", "data", data)
            setproduct(data)
        } catch (error) {
            console.log("🚀 ~ file: Home.js:38 ~ getProduct ~ error:", error)
        }
    }


    useEffect(() => {
        getProduct()
    }, [])


    return (
        <>
            <ScrollView backgroundColor={isDark ? AllColor.black : AllColor.white}>
                <View style={[styles.container1, CustomStyle.BlackBackground]}>
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
                    {/* ------------address---------------- */}
                    <View style={styles.top_Address_container}>
                        <CommonIcon IconCategoryName={"Ionicons"} IconName={"location-outline"} color={isDark ? AllColor.black : AllColor.white} size={scale(17)}></CommonIcon>
                        <Text style={[styles.top_Address_text, CustomStyle.BlackColor]}>{"Deliver to Mohammad - Hazrat Nagar Garhi -244301"}</Text>
                        <CommonIcon IconCategoryName={"AntDesign"} IconName={"caretdown"} color={isDark ? AllColor.black : AllColor.white} size={scale(15)}></CommonIcon>
                    </View>
                    {/* -------list------------- */}
                    <ListComponent
                        list={list}
                        width={scale(65)}
                        height={scale(70)}
                        imageHeight={scale(50)}
                        imageWidth={scale(50)}
                        borderRadius={scale(30)}
                    ></ListComponent>
                    {/* -------------Crousel------------ */}
                    <Crousel data={imagesForCrousel}></Crousel>
                    {/* --------trending deal---------------- */}
                    <View>
                        <Text style={[styles.trending_deal, CustomStyle.WhiteColor]}>{"Trending Deals of the week"}</Text>
                    </View>

                    {/* -------------deals----------------- */}
                    <Deal data={deals}></Deal>
                    {/* ------------line------------ */}
                    <View style={styles.line}></View>
                    {/* ---------today deals text------------------ */}
                    <View>
                        <Text style={[styles.trending_deal, CustomStyle.WhiteColor]}>{"Today's Deals"}</Text>
                    </View>

                    {/* ------------------deals--------------- */}
                    <List_2
                        data={offers}
                        width={scale(150)}
                        height={scale(150)}
                        imageHeight={scale(150)}
                        imageWidth={scale(150)}
                        borderRadius={scale(5)}
                    ></List_2>
                    {/* --------------product list------------- */}
                    <View>
                        <Text style={[styles.trending_deal, CustomStyle.WhiteColor]}>{"Products"}</Text>
                    </View>
                    {/* -----------product--------------- */}
                    <ProductItem data={product}></ProductItem>
                </View>
            </ScrollView>

        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        // backgroundColor: "#fff"
    },
    top_Address_container: {
        backgroundColor: "#a2e9e9",
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(5),
        paddingVertical: scale(5),
    },
    top_Address_text: {
        fontSize: scale(11),
        fontWeight: "500",
        marginHorizontal: scale(5),
    },
    trending_deal: {
        fontWeight: "500",
        marginLeft: scale(10),
        marginVertical: scale(10),
        fontSize: scale(15)
    },
    line: {
        width: responsiveScreenWidth(100),
        height: scale(2),
        backgroundColor: "gray",
        marginTop: scale(5)
    }

})