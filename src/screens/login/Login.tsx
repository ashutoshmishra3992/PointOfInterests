import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, Button } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation/Navigation';

type LoginScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({ navigation }: LoginScreenNavigationProps) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [number, onChangeNumber] = useState('');
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("Sent OTP")
  const [otp, setOtp] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  function onSubmitButtonClicked() {
    if(submitButtonText == 'Send OTP') {
      signInWithPhoneNumber()
    } else {

    }
  }

  // Handle the button press
  async function signInWithPhoneNumber() {
    const phone = "+91${number}"
    const confirmation = await auth().signInWithPhoneNumber(phone);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../assets/images/ic_location.png')} />
          <View style={styles.mobileNoAndButtonContainer}>
            <View style={styles.mobileNoContainer}>
              <Text style={styles.countryCodeText}>+91</Text>
              <TextInput
                style={styles.mobileNoText}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Mobile No."
                keyboardType='number-pad'
                returnKeyType='done'
              />
            </View>
            <Button
              title={submitButtonText}
              onPress={() => { onSubmitButtonClicked() }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {user.email}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  mobileNoAndButtonContainer: {
    flexDirection: 'column',
  },
  mobileNoContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    width: '90%',
    padding: 8,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Montserrat-Regular',
  },
  mobileNoText: {
    flex: 1,
    marginStart: 8,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Login;