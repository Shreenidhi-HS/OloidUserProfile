interface User {
  Bluetooth?: any;
  SecondaryID?: any;
  Faces?: any[];
  Pin?: any;
  QRCode?: any;
  IDSearch1?: any;
  UserPasswords?: any;
}

export const CredData = (user: User) => {
  const userCredentials = [
    {
      key: "Bluetooth",
      name: "Bluetooth",
      hasCred: user?.Bluetooth === undefined ? false : true,
      icon: "/assets/credentials/bluetooth.svg",
      url: "/credentials/bluetooth",
    },
    {
      key: "BadgeID",
      name: "BadgeID",
      hasCred: user?.SecondaryID === undefined ? false : true,
      icon: "/assets/credentials/badge.svg",
      url: "/credentials/badge",
    },
    {
      key: "Faces",
      name: "Faces",
      hasCred: user?.Faces?.length === 0 ? false : true,
      icon: "/assets/credentials/face.svg",
      url: "/credentials/faces",
    },
    {
      key: "Pin",
      name: "Pin",
      hasCred: user?.Pin === undefined ? false : true,
      icon: "/assets/credentials/pin.svg",
      url: "/credentials/pin",
    },
    {
      key: "QR Code",
      name: "QR Code",
      hasCred: user?.QRCode === undefined ? false : true,
      icon: "/assets/credentials/qr-code-circle.svg",
      url: "/credentials/qrcode",
    },
    {
      key: "NFC",
      name: "NFC",
      hasCred: user?.IDSearch1 === undefined ? false : true,
      icon: "/assets/credentials/nfc.svg",
      url: "/credentials/nfc",
    },
    {
      key: "Password",
      name: "Password",
      hasCred: user?.UserPasswords === undefined ? false : true,
      icon: "/assets/credentials/password.svg",
      url: "/credentials/password",
    },
  ];

  return userCredentials;
};
