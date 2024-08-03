import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native'
import Splass from '../Screen/Splass/Splass'
import Home from '../Screen/Home/Home'
import Login from '../Screen/Login/Login'
import Signup from '../Screen/Signup/Signup'
import ProductDetail from '../Screen/ProductDetail/ProductDetail'
import DropDown from '../Screen/dropdown/DropDown'
import AddAddress from '../Screen/Address/AddAddress/AddAddress'
import NewAddress from '../Screen/Address/newAddress/NewAddress'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../bottomTab/Screen/profile/Profile'
import Cart from '../bottomTab/cart/Cart'
import CommonIcon from '../Component/Icon/CommonIcon'
import { AllColor } from '../util/Color/AllColor'
import { scale } from 'react-native-size-matters'
import { Text } from 'react-native-animatable'
import { useCustomStyle } from '../Hooks/Style/useCutomStyle'
import Confirmation from '../Screen/confirmation/Confirmation'
import ConfirmOrder from '../Screen/confirmOrder/ConfirmOrder'


const bottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

export const BottomTapNavigator = () => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    return (
        <bottomTab.Navigator screenOptions={{ animation: "slide_from_right", tabBarStyle: { height: scale(40), backgroundColor: isDark ? AllColor.black : AllColor.white } }}>
            <bottomTab.Screen
                name="Home"
                component={Home}
                options={{

                    headerShown: false,
                    tabBarLabel: ({ focused, size }) => {
                        return (
                            <Text style={{ color: focused ? AllColor.Androidgreen : AllColor.gray, fontSize: scale(10), fontWeight: "500" }}>{"Home"}</Text>
                        )
                    },
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ?
                            (
                                <CommonIcon IconCategoryName={"Ionicons"} IconName={"home"} color={AllColor.Androidgreen}></CommonIcon>
                            ) : (
                                <CommonIcon IconCategoryName={"Ionicons"} IconName={"home-outline"} color={AllColor.gray}></CommonIcon>
                            ),
                }
                }


            />
            <bottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: ({ focused, size }) => {
                        return (
                            <Text style={{ color: focused ? AllColor.Androidgreen : AllColor.gray, fontSize: scale(10), fontWeight: "500" }}>{"Profile"}</Text>
                        )
                    },
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ?
                            (
                                <CommonIcon IconCategoryName={"Entypo"} IconName={"user"} color={AllColor.Androidgreen}></CommonIcon>

                            ) : (
                                <CommonIcon IconCategoryName={"Entypo"} IconName={"user"} color={AllColor.gray}></CommonIcon>
                            ),
                }}
            />
            <bottomTab.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false,
                    tabBarLabel: ({ focused, size }) => {
                        return (
                            <Text style={{ color: focused ? AllColor.Androidgreen : AllColor.gray, fontSize: scale(10), fontWeight: "500" }}>{"Cart"}</Text>
                        )
                    },
                    tabBarIcon: ({ focused, color, size }) =>
                        focused ?
                            (
                                <CommonIcon IconCategoryName={"Ionicons"} IconName={"cart"} color={AllColor.Androidgreen}></CommonIcon>

                            ) : (
                                <CommonIcon IconCategoryName={"Ionicons"} IconName={"cart-outline"} color={AllColor.gray}></CommonIcon>
                            ),
                }}
            />
        </bottomTab.Navigator>
    );
}


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
                <Stack.Screen name={"Splass"} component={Splass} />
                <Stack.Screen name={"BottomTapNavigator"} component={BottomTapNavigator} />
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"Signup"} component={Signup} />
                <Stack.Screen name={"ProductDetail"} component={ProductDetail} options={{ statusBarColor: AllColor.white, statusBarStyle: "dark", statusBarAnimation: "fade" }} />
                <Stack.Screen name={"DropDown"} component={DropDown} />
                <Stack.Screen name={"AddAddress"} component={AddAddress} />
                <Stack.Screen name={"NewAddress"} component={NewAddress} />
                <Stack.Screen name={"Confirmation"} component={Confirmation} />
                <Stack.Screen name={"ConfirmOrder"} component={ConfirmOrder} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

