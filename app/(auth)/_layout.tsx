import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
  
    <Stack  screenOptions={{ headerShown: false}}>
      <Stack.Screen name='signIn'   />
      <Stack.Screen name='signup'  />
      

      <StatusBar backgroundColor='#161622' style="light" />
      </Stack>
   
    
  )
}

export default AuthLayout;