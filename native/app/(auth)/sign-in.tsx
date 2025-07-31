import { AuthInputField } from "@/components/AuthInputField";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { Text } from "@/components/ui/text";

const signInSchema = z.object({
  email: z.email("Email invalid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type signInFormType = z.TypeOf<typeof signInSchema>;

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInFormType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignInPress = async (data: signInFormType) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
    }
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

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handleSubmit(onSignInPress)}
      >
        <ButtonText>Sign In</ButtonText>
      </Button>

      <View className="">
        <Text>Don&apos;t have an account?</Text>
        <Link href="/(auth)/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </View>
      
    </VStack>
  );
}
