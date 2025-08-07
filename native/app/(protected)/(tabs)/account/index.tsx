import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { AccountScreenComponent } from "@/features/account/components";
import { useAccountData } from "@/features/account/queries/useAccountData";

export default function AccountScreen() {
  const { accountGroups, balanceHeader, isLoading } = useAccountData();

  if (isLoading) {
    return (
      <Center className="flex-1">
        <Spinner size="large"/>
      </Center>
    )
  }

  return (
    <AccountScreenComponent 
      balanceHeader={balanceHeader}
      accountGroups={accountGroups}
    />
  );
}
