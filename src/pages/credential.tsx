import React, { useContext, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordian";
import Bluetooth from "../components/bluetooth";
import Badge from "../components/badge";
import Face from "../components/face";
import Pin from "../components/pin";
import Nfc from "../components/nfc";
import QRcode from "../components/qr-code";
import Password from "../components/password";
import { LoginContext } from "../App";
import { CredData } from "../data/credential-data";
import Show from "../components/Show";

function Credential() {
  const { authContext } = useContext(LoginContext);
  const user = authContext.userDetail;

  return (
    <div className="p-2">
      <h2 className="md:text-2xl md:p-4 text-lg p-2 font-bold">
        Your Credentials
      </h2>
      <div className="flex flex-col">
        {CredData(user).map((item, i) => (
          <div
            key={i}
            className="mt-[24px] w-[90vw] md:w-[62rem] rounded-[12px] m-auto shadow-md bg-[#e5ebf1]"
          >
            <Accordion
              type="single"
              collapsible
              disabled={!item.hasCred}
              className="p-3"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="flex items-center"
                  hiddenArrow={!item.hasCred}
                >
                  <div className="flex flex-row gap-2">
                    <div>{item.name}</div>
                    {item.hasCred ? (
                      <img
                        src="../../public/assets/checkMark.svg"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <img
                        src="../../public/assets/warning-icon.svg"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Show when={item.key === "Bluetooth"} fallback={<></>}>
                    <Bluetooth />
                  </Show>

                  <Show when={item.key === "BadgeID"} fallback={<></>}>
                    <Badge />
                  </Show>

                  <Show when={item.key === "Faces"} fallback={<></>}>
                    <Face />
                  </Show>

                  <Show when={item.key === "Pin"} fallback={<></>}>
                    <Pin />
                  </Show>

                  <Show when={item.key === "QR Code"} fallback={<></>}>
                    <QRcode authContext={authContext} />
                  </Show>

                  <Show when={item.key === "NFC"} fallback={<></>}>
                    <Nfc />
                  </Show>

                  <Show when={item.key === "Password"} fallback={<></>}>
                    <Password />
                  </Show>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credential;
