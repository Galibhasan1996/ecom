import React from 'react'
import { Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

const Crousel = ({ data }) => {
    return (
        <>
            <Carousel
                loop
                width={responsiveScreenWidth(100)}
                height={scale(200)}
                // autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                // mode='curve'
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (
                    <View>
                        <Image source={{ uri: item }} style={{ width: '100%', height: scale(200) }}></Image>
                    </View>
                )}
            />
        </>
    )
}

export default Crousel