import { LoaderCircle } from "lucide-react";

const DefaultLoadingComponent = () => {
  return (
    <div className="w-full mt-4 flex justify-center">
      <LoaderCircle
        width={20}
        height={20}
        strokeWidth={4}
        className="animate-spin"
      />
    </div>
  );
};

export default DefaultLoadingComponent;
