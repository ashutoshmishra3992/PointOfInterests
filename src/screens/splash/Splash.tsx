import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation/Navigation';

type SplashScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function Splash({ navigation }: SplashScreenNavigationProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.replace('Login');
        }, 3000);
    
        return () => clearTimeout(timeout);
      }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../assets/images/ic_location.png')} />
                <Text style={styles.text}>Point Of Interests</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 24,
        fontWeight: 400,
        fontFamily: 'Montserrat-Regular',
    },
})

export default Splash;
