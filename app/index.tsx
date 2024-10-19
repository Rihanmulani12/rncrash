import { Redirect, router } from 'expo-router'
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import {images} from '../constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from '@/context/GlobalProvider';

const index = () => {

  const {isLoading , isLoggedIn} =  useGlobalContext()

  if(!isLoading && isLoggedIn){
    return <Redirect href={"/(tabs)/home"} />
  }
  return (
    <GestureHandlerRootView >
    
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height : "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4 ">
            <Image source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />

            <Image source={images.cards}
             className="max-w-[380px] w-full h-[300px] "
             resizeMode="contain"
            />

            <Text className=" text-white font-bold text-center text-3xl">
               Discover Endless Possibilities With{' '}<Text className="text-secondary-200">
                Aora
               </Text>

               

               <Image source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-10 -right-8"
            resizeMode="contain"
            />
          
            </Text>


            
          <CustomButton title="Continue with Email"
          handlePress={() => router.replace('/signIn')}
          containerStyle="w-full , mt-7"
            
          />

           

          </View>

          

          

          

        </ScrollView>

        <StatusBar backgroundColor="#161622" style='light'/>


      </SafeAreaView>
      
    </GestureHandlerRootView>
    
  );
};

export default index;
