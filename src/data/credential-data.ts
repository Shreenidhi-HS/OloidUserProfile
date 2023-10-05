interface User {
    Bluetooth?: any;
    BadgeID?: any;
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
          hasCred: user.Bluetooth === undefined ? false : true,
        },
        {
          key: "BadgeID",
          name: "BadgeID",
          hasCred: user.BadgeID === undefined ? false : true,
        },
        {
          key: "Faces",
          name: "Faces",
          hasCred: user.Faces?.length === 0 ? false : true,
        },
        {
          key: "Pin",
          name: "Pin",
          hasCred: user.Pin === undefined ? false : true,
        },
        {
          key: "QR Code",
          name: "QR Code",
          hasCred: user.QRCode === undefined ? false : true,
        },
        {
          key: "NFC",
          name: "NFC",
          hasCred: user?.keySearch1 === undefined ? false : true,
        },
        {
          key: "Password",
          name: "Password",
          hasCred: user.UserPasswords === undefined ? false : true,
        },
    ];

    return userCredentials;
}
