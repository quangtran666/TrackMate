import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";

export function CreateAccountFab() {
  const router = useRouter();

  return (
    <Fab
      placement="bottom right"
      size="lg"
      onPress={() => router.push("./account/create")}
    >
      <FabIcon as={AddIcon} size="lg" />
    </Fab>
  );
}
