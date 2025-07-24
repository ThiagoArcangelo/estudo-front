import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="bg-transparent w-full h-screen">
      <LoaderCircle size={50} color="#79797a" />
    </div>
  );
};
