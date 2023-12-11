import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTransaction } from "../services/transaction";

function Transaction() {
  const transaction = [
    {
      id: 1,
      icon: "../../public/assets/transaction/bluetooth.svg",
      date: "22 Aug, 2023 04:44 PM",
      location: "Indicuvbe Office",
    },
    {
      id: 2,
      icon: "../../public/assets/transaction/faceverify.svg",
      date: "23 Aug, 2023 10:15 AM",
      location: "Coffee Shop",
    },
    {
      id: 3,
      icon: "../../public/assets/transaction/keylock.svg",
      date: "24 Aug, 2023 02:30 PM",
      location: "Grocery Store",
    },
    {
      id: 4,
      icon: "../../public/assets/transaction/passordlock.svg",
      date: "25 Aug, 2023 08:00 AM",
      location: "Gym",
    },
    {
      id: 5,
      icon: "../../public/assets/transaction/qrcode.svg",
      date: "26 Aug, 2023 06:00 PM",
      location: "Restaurant",
    },
  ];

  const {
    data: TransactionData,
    error,
    isLoading: isTransactionDataLoading,
    refetch: refetchTrasaction,
    status: TrasactionStatus,
  } = useQuery("transactionData", getTransaction);

  function fomatDate(timestamp: any) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  const getImageType = (imageType) => {
    if (imageType === "CloudKey") {
      return "../../public/assets/transaction/keylock.svg";
    } else if (imageType === "QRCode") {
      return "../../public/assets/transaction/qrcode.svg";
    } else if (imageType === "Bluetooth")
      "../../public/assets/transaction/bluetooth.svg";
    else if (imageType === "Pin") {
      return "../../public/assets/transaction/passordlock.svg";
    }
  };

  return (
    <div className="p-3 flex flex-col items-center mt-4">
      {isTransactionDataLoading ? (
        <div className="m-auto">
          <img
            src="../../public/assets/loader.svg"
            className="animate-spin m-auto invert"
            height={44}
            width={44}
            alt="loader"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center mt-6">
          {TransactionData?.data?.Transactions.length > 0 ? (
            <>
              {TransactionData?.data?.Transactions.map((item: any) => (
                <div className="bg-[#e5ebf1] rounded-[0.75rem] w-full max-w-[90vw] md:max-w-[50vw] p-4 flex flex-row gap-4 items-center">
                  <div>
                    <img
                      src={getImageType(item.AuthType)}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </div>
                  <div>
                    <div>{fomatDate(item.CreatedOn)}</div>
                    <div>{item.EndpointName}</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-2xl m-auto flex items-center justify-center flex-col gap-3 absolute top-1/3">
              <img
                src="/assets/no-data.svg"
                alt=""
                className="w-[150px] h-[150px]"
              />
              <p className="text-[#475467] text-xs">No Transactions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Transaction;
