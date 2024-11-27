import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrder } from "@/queries/orders";
import { LoaderCircle } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

type SelectStatusProps = {
  id: number;
  status: string;
};

export default function SelectStatus({ id, status }: SelectStatusProps) {
  const { mutate: updateOrderStatus, isPending } = useUpdateOrder();
  const { toast } = useToast();

  const handleOrderStatus = (status: string) => {
    updateOrderStatus(
      { id, status },
      {
        onSuccess: () => {
          toast({
            title: "Status edited successfully",
            action: (
              <ToastAction altText="Goto schedule to undo">Close</ToastAction>
            ),
          });
        },
        onError: (error) => {
          console.log("Error al actualizar el status:", error);
          toast({
            variant: "destructive",
            title: "Oops, something went wrong",
            action: (
              <ToastAction altText="Goto schedule to undo">Close</ToastAction>
            ),
          });
        },
      }
    );
  };

  return (
    <Select
      onValueChange={(value) => handleOrderStatus(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px] mt-3">
        {isPending ? (
          <div className="animate-spin">
            <LoaderCircle size={16} />
          </div>
        ) : (
          <SelectValue placeholder={status} />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Edit Order Status</SelectLabel>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Payed">Payed</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
