import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { getCurrentUser,  account , signIn } from "../../lib/appwrite";

import { images } from "../../constants";
import FormField from "../../components/FromField";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from '@/components/CustomButton';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    setSubmitting(true);
  
    try {
      // Check if the user is already logged in
      const currentSession = await account.getSession("current");
  
      if (currentSession) {
        // If a session exists, you can skip creating a new session
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");
        Alert.alert("Success", "Already signed in");
      } else {
        // No session exists, proceed with sign-in
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");
        Alert.alert("Success", "User signed in successfully");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          {/* Username Field */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
            placeholder="Enter your username"
          />

          {/* Email Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          {/* Password Field */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry // Hide password input
            placeholder="Enter your password"
          />

          {/* Sign Up Button */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting} // Show loading state during submission
          />

          {/* Link to Sign In */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/signIn"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
