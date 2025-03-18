// "use client";

// import { useState } from "react";
// import { QRCodeGenerator } from "./qr-code-generator";
// import { QRCodeList } from "./qr-code-list";

// interface QRCode {
//   id: string;
//   productId: string;
//   productName: string;
//   type: string;
//   createdAt: string;
//   lastScanned: string;
// }

// export default function QRCodeManager() {
//   const [qrCodes, setQrCodes] = useState<QRCode[]>([]);

//   // Define the onGenerate function
//   const handleAddQrCode = (newQrCode: QRCode) => {
//     console.log("Adding new QR Code:", newQrCode); // Debugging
//     setQrCodes((prevQrCodes) => [...prevQrCodes, newQrCode]);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Pass the onGenerate function as a prop */}
//       <QRCodeGenerator onGenerate={handleAddQrCode} />
//       <QRCodeList qrCodes={qrCodes} />
//     </div>
//   );
// }