import React, { useState } from 'react'
import { renderData } from '../data/consentData'
import Button from './ui/button'
import { useNavigate } from 'react-router-dom'

const ConsentForm = () => {
    const navigate = useNavigate();
    const [expandScanPolicy , setExpand] = useState(false);

    return (
        <div className='flex flex-col w-full bg-white p-6 rounded-t-lg'>
            <h2 className='text-[#101828] text-xl font-avenirHeavy'>Test Consent</h2>

            <div className='flex flex-col gap-[10px] text-[1rem] w-full mt-2h'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <p className='text-[#667085] font-avenirHeavy'>Company</p>
                    <p className='text-[#667085] font-avenirRegular'>Lift</p>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <p className='text-[#667085] font-avenirHeavy'>Subject</p>
                    <p className='text-[#667085] font-avenirRegular'>Naina A</p>
                </div>
            </div>

            <div className='flex flex-col justify-between gap-[1rem] mt-4'>
                <div className='bg-[#EBECF1] h-[1px] w-full' />
                <div>
                    <div>
                        <h2 className='text-[#667085] text-base  font-avenirMedium'>{renderData.scanHead}</h2>
                        <div className={`${expandScanPolicy ? "h-full" : "max-h-[10.625rem] overflow-hidden"}  text-xs text-[#7D7D7D] font-avenirMedium`}>
                            {renderData.scanPolicy}
                        </div>
                    </div>
                    <p onClick={() => setExpand(!expandScanPolicy)} className='font-semibold text-sm text-[#0B6FD0] mt-1'>{expandScanPolicy ? "See Less" : "See More"}</p>
                </div>


                <div className='bg-[#EBECF1] h-[1px] w-full' />

                <div>
                    <h2 className='text-[#667085] text-base  font-avenirMedium'>{renderData.oloidLegal}</h2>
                    <div className='max-h-[10.625rem] overflow-y-auto text-xs text-[#7D7D7D]'>
                        {renderData.legalText}
                    </div>
                </div>

                <div className='bg-[#EBECF1] h-[1px] w-full' />

                <div>
                    <h2 className='text-[#667085] text-base font-avenirMedium'>{renderData.scopeHead}</h2>
                    <div className='max-h-[10.625rem] overflow-y-auto text-xs text-[#7D7D7D]'>
                        {renderData.scopeText}
                    </div>
                </div>

                <div className='bg-[#EBECF1] h-[1px] w-full' />

                <div>
                    <h2 className='font-avenirMedium text-[#667085] text-base'>Oloid Legal Documents</h2>
                    <p className='font-semibold text-sm text-[#0B6FD0] mt-1'>Privacy Policy</p>
                </div>

                <div className='bg-[#EBECF1] h-[1px] w-full' />

                <Button
                    text="Agree"
                    variant='primary'
                    onClick={() => navigate("/credentials/faces")}
                />

            </div>
        </div>
    )
}

export default ConsentForm
