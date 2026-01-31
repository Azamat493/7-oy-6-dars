import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useDeleteOrderMutation } from "../../hooks/useQuery/useQueryAction/useQueryAction";
import { setOpenDeleteOrderModal } from "../../redux/modal-store";


const Info = ({
  label,
  value,
  danger,
}: {
  label: string;
  value?: string;
  danger?: boolean;
}) => {
  return (
    <div>
      <p className="text-[12px] text-gray-400">{label}</p>
      <p
        className={`font-semibold text-[14px] ${
          danger ? "text-red-500" : "text-gray-800"
        }`}
      >
        {value || "-"}
      </p>
    </div>
  );
};


const DeleteOrderModalStory = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { openDeleteOrderModal, orderData } = useSelector(
    (state: any) => state.modalSlice,
  );

  const { mutate, isPending } = useDeleteOrderMutation();

  useEffect(() => {
    if (openDeleteOrderModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDeleteOrderModal]);

  if (!orderData) return null;

  /* ===== HANDLERS ===== */
  const handleClose = () => {
    dispatch(setOpenDeleteOrderModal({ open: false, data: null }));
  };

  const handleDelete = () => {
    if (!orderData._id) return;

    mutate(orderData._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-orders"] });
        handleClose();
      },
      onError: (err) => {
        console.error("Delete order error:", err);
      },
    });
  };

  return (
    <AnimatePresence>
      {openDeleteOrderModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* HEADER */}
            <div className="relative bg-gradient-to-r from-red-500 to-red-600 px-6 py-5 text-white">
              <h2 className="text-[18px] font-semibold">
                Delete Order Confirmation
              </h2>
              <p className="text-[13px] text-red-100 mt-1">
                This action cannot be undone
              </p>

              <button
                onClick={handleClose}
                className="absolute cursor-pointer top-4 right-4 text-xl text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Info
                  label="Order ID"
                  value={orderData._id?.slice(-8).toUpperCase()}
                />
                <Info
                  label="Date"
                  value={new Date(
                    orderData.createdAt || orderData.extra_shop_info?.date,
                  ).toLocaleDateString("en-GB")}
                />
                <Info
                  label="Payment"
                  value={orderData.extra_shop_info?.method
                    ?.replace(/-/g, " ")
                    .toUpperCase()}
                />
                <Info
                  label="Total"
                  value={`$${Number(orderData.extra_shop_info?.total).toFixed(
                    2,
                  )}`}
                  danger
                />
              </div>

              <div className="max-h-[180px] overflow-y-auto space-y-2 mb-6 pr-1">
                {orderData.shop_list?.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.main_image}
                        alt={item.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.count || item.counter}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-red-500">
                      ${(item.price * (item.count || item.counter)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="w-1/2 cursor-pointer py-3 border rounded-lg font-medium 
               bg-white hover:bg-gray-100 hover:scale-105 transition-transform transition-colors duration-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="w-1/2 cursor-pointer py-3 bg-red-600 text-white rounded-lg font-semibold
               hover:bg-red-700 hover:scale-105 transition-transform transition-colors duration-200
               disabled:opacity-60 flex justify-center"
                >
                  {isPending ? "Deleting..." : "Delete Order"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteOrderModalStory;
