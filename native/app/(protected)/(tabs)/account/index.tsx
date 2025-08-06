import { AccountScreenComponent } from "@/features/account/components";
import { useAccountData } from "@/features/account/hooks/useAccountData";

export default function AccountScreen() {
  const { accountGroups, balanceHeader } = useAccountData();

  return (
    <AccountScreenComponent 
      balanceHeader={balanceHeader}
      accountGroups={accountGroups}
    />
  );
}
