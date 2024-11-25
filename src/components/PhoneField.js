


// import React, { useEffect, useState } from "react";
// import InputMask from "react-input-mask";
// import { TextField } from "@mui/material";
//
// const formatPhoneNumber = (phone) => {
//     const cleaned = phone.replace(/[^\d+]/g, ""); // Remove non-numeric characters except '+'
//     if (cleaned.length <= 10) {
//         return cleaned.replace(
//             /(\d{0,3})(\d{0,3})(\d{0,4})/,
//             (_, p1, p2, p3) =>
//                 `${p1 ? `(${p1}` : ""}${p2 ? `) ${p2}` : ""}${p3 ? `-${p3}` : ""}`
//         );
//     } else {
//         return cleaned.replace(
//             /(\+?\d{1,3})(\d{0,3})(\d{0,3})(\d{0,4})/,
//             (_, p1, p2, p3, p4) =>
//                 `${p1} (${p2}) ${p3}-${p4}`
//         );
//     }
// };
//
// export default function PhoneField({ phone, onPhoneChange }) {
//     const [localPhone, setLocalPhone] = useState(phone || ""); // Local state to manage input
//
//     useEffect(() => {
//         setLocalPhone(phone || ""); // Update local state if the prop changes
//     }, [phone]);
//
//     const handlePhoneChange = (e) => {
//         const input = e.target.value;
//         const formatted = formatPhoneNumber(input);
//         setLocalPhone(formatted); // Update local state
//         onPhoneChange(formatted); // Notify parent of the change
//     };
//
//     return (
//         <InputMask
//             value={localPhone}
//             onChange={handlePhoneChange}
//             maskPlaceholder={null}
//         >
//             {(inputProps) => (
//                 <TextField
//                     {...inputProps}
//                     margin="normal"
//                     required
//                     fullWidth
//                     label="Phone"
//                     name="phone"
//                     sx={{
//                         backgroundColor: "rgba(210,210,210,.95)",
//                     }}
//                 />
//             )}
//         </InputMask>
//     );
// }
