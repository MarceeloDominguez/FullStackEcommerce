import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonProductDetails() {
  return (
    <>
      <Skeleton className="h-[450px] w-full" />
      <div className="flex justify-center">
        <Card className="shadow-none border-none rounded-none w-full md:max-w-md bg-slate-50">
          <CardHeader>
            <Skeleton className="h-8" />
            <Skeleton className="h-6 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16" />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
