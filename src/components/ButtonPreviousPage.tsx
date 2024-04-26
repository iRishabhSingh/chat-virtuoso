import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonPreviousPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleGoBack} variant="outline" size="icon">
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
  );
}
