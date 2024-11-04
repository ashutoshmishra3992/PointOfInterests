import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

function Splash() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Image style={styles.appImage} source={require('../../assets/images/ic_location.png')} />
                <Text style={styles.appName}>Point Of Interests</Text>
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
    appImage: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 24,
        fontWeight: 400,
    },
})

export default Splash;
