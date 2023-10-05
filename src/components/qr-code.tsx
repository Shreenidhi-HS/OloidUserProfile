import React from 'react'

function QRcode({authContext}) {
  const expiryDate  = authContext.userDetail.QRCode.DyanamicCode.Expiry

  function formatDate(date) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const formattedTime = new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    const month = new Date(date).toLocaleString('en-US', { month: 'short' });
  
    return {
      formattedDate,
      formattedTime,
      month,
    };
  }

  

  const { formattedDate, formattedTime, month } = formatDate(expiryDate);

  return (
    <div className='flex flex-row gap-4'>
        <div>
            <img src={authContext.userDetail.QRCode.DyanamicCode.Image} alt="qr code credential" />
        </div>
        <div className='flex flex-col gap-2 items-start'>
        <div>Expiry Date - {formattedDate} {month} {formattedTime}</div>
        <div>{formattedTime}</div>
        </div>
    </div>
  )
}

export default QRcode