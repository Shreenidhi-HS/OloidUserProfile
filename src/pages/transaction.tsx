import React, { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTransaction } from '../services/transaction';

function Transaction() {

  const transaction = [
    {
      id: 1,
      icon: "../../public/assets/transaction/bluetooth.svg",
      date: "22 Aug, 2023 04:44 PM",
      location: "Indicuvbe Office"
    },
    {
      id: 2,
      icon: "../../public/assets/transaction/faceverify.svg",
      date: "23 Aug, 2023 10:15 AM",
      location: "Coffee Shop"
    },
    {
      id: 3,
      icon: "../../public/assets/transaction/keylock.svg",
      date: "24 Aug, 2023 02:30 PM",
      location: "Grocery Store"
    },
    {
      id: 4,
      icon: "../../public/assets/transaction/passordlock.svg",
      date: "25 Aug, 2023 08:00 AM",
      location: "Gym"
    },
    {
      id: 5,
      icon: "../../public/assets/transaction/qrcode.svg",
      date: "26 Aug, 2023 06:00 PM",
      location: "Restaurant"
    }
  ];
  
  const { data: TransactionData, error, isLoading: isTransactionDataLoading, refetch: refetchTrasaction, status: TrasactionStatus } = useQuery('transactionData', getTransaction);

  function fomatDate(timestamp: any) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
  }

  const getImageType = (imageType) =>{
    if(imageType === "CloudKey"){
      return "../../public/assets/transaction/keylock.svg"
    }
    else if (imageType === "QRCode"){
      return "../../public/assets/transaction/qrcode.svg"
    }
    else if (imageType === "Bluetooth") (
      "../../public/assets/transaction/bluetooth.svg"
    )
    else if (imageType === "Pin"){
      return "../../public/assets/transaction/passordlock.svg"
    }
  }

  const dummyData = [
    {
      "IsAuthorized": true,
      "DeviceOS": "iOS",
      "CreatedOn": 1692250280028,
      "AuthMethod": "Cloud",
      "TransactionID": "EB4481B9-A054-48E2-B6A5-9D6A3A80C7BD",
      "OverAllStatus": "Completed",
      "ApplicationName": "Libertana",
      "PrimaryID": "1234567890",
      "Mode": "Online",
      "EndpointName": "naina test",
      "TransactionType": "FaceAuth",
      "EndpointID": "imzwmb",
      "AuthType": "Pin",
      "ApplicationID": "d0fd67903c1211eebed8196b8e18b823",
      "Name": "Jasir V V"
  },
  {
      "IsAuthorized": true,
      "DeviceOS": "iOS",
      "CreatedOn": 1692250168721,
      "AuthMethod": "Cloud",
      "TransactionID": "EAF3B077-B642-4BEC-BFD3-C84083550EE4",
      "OverAllStatus": "Completed",
      "ApplicationName": "Libertana",
      "PrimaryID": "1234567890",
      "Mode": "Online",
      "EndpointName": "naina test",
      "TransactionType": "FaceAuth",
      "EndpointID": "imzwmb",
      "AuthType": "Pin",
      "ApplicationID": "d0fd67903c1211eebed8196b8e18b823",
      "Name": "Jasir V V"
  },
  {
      "IsAuthorized": true,
      "DeviceOS": "iOS",
      "CreatedOn": 1692196395684,
      "AuthMethod": "Cloud",
      "TransactionID": "A4D3CA63-8FE2-4FC3-B0CA-8EB4078611E3",
      "OverAllStatus": "Completed",
      "ApplicationName": "Libertana",
      "PrimaryID": "1234567890",
      "Mode": "Online",
      "EndpointName": "naina test",
      "TransactionType": "FaceAuth",
      "EndpointID": "imzwmb",
      "AuthType": "Pin",
      "ApplicationID": "d0fd67903c1211eebed8196b8e18b823",
      "Name": "Jasir V V"
  },
  {
    "ApplicationID": "b5ec10714b7f11ed8b872dc3e559b038",
"ApplicationName": "CloudKeyTest",
"AuthMethod": "Cloud",
"AuthType": "CloudKey",
"CreatedOn": 1671052557597,
"DeviceOS": "OloId-IOS",
"EndpointID": "0KmqeN",
"EndpointName": "test",
"IsAuthorized": true,
"Mode": "Online",
"Name": "veera",
"OverAllStatus": "Completed",
"PrimaryID": "123456",
"TransactionID": "80787CD0-7BF4-11ED-A169-21D80CA2B849",
"TransactionType": "CloudKey",
  }
  ]

  return (
    <div className='overflow-auto h-screen p-3 flex flex-col items-center mt-4'>
      <p className=''>Only last 5 transaction will be shown here</p>
      {isTransactionDataLoading ? (
        <div className='m-auto'>
          <img src="../../public/assets/loader.svg" className="animate-spin m-auto invert" height={44} width={44} alt="loader" />
        </div>
      ) : (
        <div className='flex flex-col gap-3 items-center mt-6 w-full h-full'>
          {/* {transaction.map((item) =>
        (
         <div className='bg-[#e5ebf1] rounded-[0.75rem] w-full max-w-[90vw] md:max-w-[50vw] p-4 flex flex-row gap-4 items-center'>
           <div>
             <img src={item.icon} width={32} height={32} alt="" />
           </div>
           <div>
             <div>{item.date}</div>
             <div>{item.location}</div>
           </div>
         </div>
        ))} */}
        {TransactionData?.data?.Transactions.length > 0 ? 
        (
         <>
          {TransactionData?.data?.Transactions.map((item: any) =>
          (
            <div className='bg-[#e5ebf1] rounded-[0.75rem] w-full max-w-[90vw] md:max-w-[50vw] p-4 flex flex-row gap-4 items-center'>
              <div>
                <img src={getImageType(item.AuthType)} width={32} height={32} alt="" />
              </div>
              <div>
                <div>{fomatDate(item.CreatedOn)}</div>
                <div>{item.EndpointName}</div>
              </div>
            </div>
          ))}
         </> 
        ) : (
          <div className='text-2xl m-auto flex items-center justify-center h-full w-full flex-col gap-3'>
            <img src="../../public/assets/transaction/no-data.svg" alt="no transaction data" className='w-[150px] h-[150px] opacity-[0.3]' />
            <h2 className='text-'>No Transaction</h2>
          </div>
        )}
         
        </div>
      )}
    </div>
  )
}

export default Transaction
