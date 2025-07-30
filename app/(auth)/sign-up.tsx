import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { AuthInputField } from "../../components/AuthInputField";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { View } from "react-native";

const signUpSchema = z
  .object({
    email: z.email("Email invalid"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type signUpFormType = z.TypeOf<typeof signUpSchema>;

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async (data: signUpFormType) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <VStack space="md">
        <Text>Verify your email</Text>
        <Input>
          <InputField
            value={code}
            onChangeText={setCode}
            placeholder="Enter verification code"
          />
        </Input>
        <Button
          size="md"
          variant="solid"
          action="primary"
          onPress={onVerifyPress}
        >
          <ButtonText>Verify</ButtonText>
        </Button>
      </VStack>
    );
  }

  return (
    <VStack space="md">
      <AuthInputField
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        control={control}
        errors={errors}
      />

      <AuthInputField
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        control={control}
        errors={errors}
      />

      <AuthInputField
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Enter your confirm password"
        secureTextEntry
        control={control}
        errors={errors}
      />

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handleSubmit(onSignUpPress)}
      >
        <ButtonText>Sign Up</ButtonText>
      </Button>

      <View>
        <Text>Already have an account?</Text>
        <Link href="/(auth)/sign-in">
          <Text>Sign In</Text>
        </Link>
      </View>
    </VStack>
  );
}
