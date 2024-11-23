// pages/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box, FormControl, Select, MenuItem, InputLabel,
} from '@mui/material';
import InputMask from 'react-input-mask';
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";
import {Ledger} from "next/font/google";

const TAG_OPTIONS = ['Manufacturer', 'Wholesaler', 'Retailer','Service', 'Independent', 'Other'];

const COUNTRY_OPTIONS = [
  "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "AS", "AT", "AU", "AW", "AX", "AZ",
  "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR",
  "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL",
  "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO",
  "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FM", "FO", "FR", "GA", "GB",
  "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GT", "GU", "GW",
  "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS",
  "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY",
  "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD",
  "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU",
  "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR",
  "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PT", "PW",
  "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI",
  "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD",
  "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG",
  "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT",
  "ZA", "ZM", "ZW"
]
const ledger = Ledger({
    subsets: ['latin'], // Choose the character subset you need
    weight: '400',      // Specify the weight (Knewave only supports 400)
});

export default function EditVendor() {
  const router = useRouter();
  const { id } = router.query;
  const [vendor, setVendor] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    tag:'',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/vendors/${id}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Vendor not found');
        })
        .then((data) => setVendor(data))
        .catch((error) => {
          console.error(error);
          router.push('/');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setVendor({ ...vendor, [name]: value });

      if( name === 'email') {
        if (!emailRegex.test(value)) {
          setEmailError(true);
          setEmailHelperText('Please enter a valid email address ');
        } else {
          setEmailError(false);
          setEmailHelperText('');
        }
      }
      setVendor({
        ...vendor,
        [name]: value,
      });

        // else if (name === "phone") {
        //   // Removing any spaces and trimming the number to keep only the valid digits
        //   const cleanedValue = value.replace(/[^0-9+()\s-]/g, '');
        //   setVendor({
        //     ...vendor,
        //     [name]: cleanedValue,
        //   });
        // }

    //   else if( name === 'phone'){
    //     if(!phoneRegex.test(value)) {
    //       setPhoneError(true);
    //       setPhoneHelperText('Please enter a valid phone number');
    //     } else {
    //       setPhoneError(false);
    //       setPhoneHelperText('');
    //     }
    // }
  };


  const cleanPhoneNumber = (phone) => {
    // Remove all spaces and dashes for storage
    let cleaned = phone.replace(/[^0-9+]/g, '');

    // Ensure the phone number follows the format +x (xxx) xxx-xxxx
    if (cleaned.length >= 1 && cleaned.length <= 4) {
      cleaned = cleaned.replace(/(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})/, '+$1 ($2) $3-$4');
    } else if (cleaned.length > 4 && cleaned.length <= 5) {
      cleaned = cleaned.replace(/(\d{2})(\d{0,3})(\d{0,3})(\d{0,4})/, '+$1 ($2) $3-$4');
    } else if (cleaned.length > 5) {
      cleaned = cleaned.replace(/(\d{3})(\d{0,3})(\d{0,3})(\d{0,4})/, '+$1 ($2) $3-$4');
    }
    return cleaned;
  };
  // const handlePhoneChange = (value) => {
  //   setVendor((prev) => ({...prev, [name]:value}));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email and phone number one more time
    if(!emailRegex.test(vendor.email)){
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address");
      return;
    }

    // vendor.phone = cleanPhoneNumber(vendor.phone);
    // if(!phoneRegex.test(vendor.phone)){
    //   setPhoneError(true);
    //   setPhoneHelperText("Please enter a valid phone number");
    //   return;
    // }



    const res = await fetch(`/api/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendor),
    });
    if (res.ok) {
      router.push('/');
    }
  };

  return (
      <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            minHeight:'100vh',
          }}
          >


        <Box
            sx={{
              height: 'auto',
              width: '70vw',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <h1
              style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                marginTop: '35px auto',
                color: '#19a7d2',
                fontWeight: 'bold',
                fontSize: '50px',
                textStroke: '.25px black',
                textShadow: '4px 4px 8px rgba(0, 0, 0, 1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                display: 'inline-block',
                padding: '1px 15px',
                // width:'auto',
                // height:'auto',

              }}
              className={ledger.className}
          >
            Edit Vendor
          </h1>
          <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 2,
              }}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={vendor.name}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'rgba(210,210,210,.95)',
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Contact"
                name="contact"
                value={vendor.contact}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'rgba(210,210,210,.95)',
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={vendor.email}
                onChange={handleChange}
                error={emailError}
                helperText={emailHelperText}
                sx={{
                  backgroundColor: 'rgba(210,210,210,.95)',
                }}
            />
            {/*<InputMask*/}
            {/*    maskChar=""*/}
            {/*    mask={getPhoneMask(vendor.phone)}*/}
            {/*    value={vendor.phone}*/}
            {/*    onChange={handleChange}*/}
            {/*    alwaysShowMask={false}*/}
            {/*>{(inputProps) => (*/}
            {/*  <TextField*/}
            {/*      {...inputProps}*/}
            {/*      label="Phone"*/}
            {/*      fullWidth*/}
            {/*      name="phone"*/}
            {/*      sx={{*/}
            {/*        marginBottom:'16px',*/}

            {/*      }}*/}
            {/*    />*/}
            {/*    )}*/}

            {/*</InputMask>*/}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Phone"
                name="phone"
                value={vendor.phone}
                onChange={handleChange}
                error={phoneError}
                helperText={phoneHelperText}
                sx={{
                  backgroundColor: 'rgba(210,210,210,.95)',
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Address"
                name="address"
                value={vendor.address}
                onChange={handleChange}
                sx={{
                  backgroundColor: 'rgba(210,210,210,.95)',
                }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="tag-label">Tag</InputLabel>
              <Select
                  label="Tag"
                  labelId="tag-label"
                  name="tag"
                  value={vendor.tag}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: 'rgba(210,210,210,.95)',
                  }}
              >
                {TAG_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{mt: 3, mb: 0}}
            >
              Update Vendor
            </Button>
          </Box>


        </Box>
      </Box>
  );
}

const getPhoneMask = (phone) => {
  // If the country code is being typed
  if (phone.length >= 1 && phone.length <= 4) {
    return "+9 (999) 999-9999"; // Mask for country code length 1
  } else if (phone.length > 4 && phone.length <= 5) {
    return "+99 (999) 999-9999"; // Mask for country code length 2
  } else if (phone.length > 5) {
    return "+999 (999) 999-9999"; // Mask for country code length 3
  }
  return "+9 (999) 999-9999"; // Default mask
};