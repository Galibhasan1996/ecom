import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { AllColor } from '../../util/Color/AllColor';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle';
import CommonIcon from '../../Component/Icon/CommonIcon';

const DropDown = ({ options, onSelect }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
                <Text style={[styles.dropdownButtonText, CustomStyle.WhiteColor]}>
                    {selectedOption ? selectedOption.label : 'All'}
                </Text>
                {
                    isOpen ?
                        <CommonIcon IconCategoryName={"AntDesign"} IconName={"up"} color={isDark ? AllColor.white : AllColor.black} size={scale(15)}></CommonIcon>
                        :
                        <CommonIcon IconCategoryName={"AntDesign"} IconName={"down"} color={isDark ? AllColor.white : AllColor.black} size={scale(15)}></CommonIcon>
                }
            </TouchableOpacity>
            {
                isOpen &&
                (
                    <View style={[styles.dropdown, CustomStyle.BlackBackground]}>

                        {
                            options.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={styles.option} onPress={() => {
                                            handleSelectOption(item)
                                        }}>
                                            <Text style={[styles.optionText, CustomStyle.WhiteColor]}>{item.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: scale(20),
    },
    dropdownButton: {
        padding: 10,
        borderWidth: scale(1),
        borderColor: AllColor.Androidgreen,
        width: responsiveScreenWidth(50),
        borderRadius: 5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    dropdown: {
        marginTop: 5,
        borderRadius: 5,
        elevation: 3,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
});

export default DropDown;

