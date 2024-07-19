// CustomDropdown.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { AllColor } from '../../util/Color/AllColor';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { useCustomStyle } from '../../Hooks/Style/useCutomStyle';
import { useNavigation } from '@react-navigation/native';

const DropDown = ({ options, onSelect }) => {
    // ------------custom Style------------
    const { CustomStyle, isDark } = useCustomStyle()
    // --------navigation------------
    const navigation = useNavigation()

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
                <Text style={styles.dropdownButtonText}>
                    {selectedOption ? selectedOption.label : 'jewelery'}
                </Text>
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
        margin: 20,
    },
    dropdownButton: {
        padding: 10,
        borderWidth: scale(1),
        borderColor: AllColor.Androidgreen,
        width: responsiveScreenWidth(50),
        borderRadius: 5,
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

