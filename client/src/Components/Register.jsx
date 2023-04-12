import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { userContext } from '../Context/context';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

export default function Register() {

    const navigate = useNavigate()

    const [otpBox, setOtpBox] = React.useState(false)
    const [ firstName, setFirstName ] = React.useState(false)
    const [ firstNameError, setFirstNameError ] = React.useState('')
    const [ email, setEmail ] = React.useState(false)
    const [ emailError, setEmailError ] = React.useState('')
    const [ password, setPassword ] = React.useState(false)
    const [ passwordError, setPasswordError ] = React.useState('')
    const [ totalRequired, setTotalRequired ] = React.useState('')
    const [ phoneNo, setPhoneNo ] = React.useState(false)
    const [ phoneNoError, setPhoneNoError ] = React.useState('')
    const [ otp, setOtp ] = React.useState(false)
    const [ otpError, setOtpError ] = React.useState('')

    const {user,setUser} = React.useContext(userContext)


  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        phoneNo: data.get('phoneNo'),
        otp: data.get('otp'),
    }
    if(data.firstName && data.email && data.password && data.phoneNo){
        let regName =/^[a-zA-Z]+$/;
        let regPhone =/^[0-9]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        setTotalRequired('')
        if(regName.test(data.firstName)){
          setFirstName(false)
          setFirstNameError('')
          if(regEmail.test(data.email)){
            setEmail(false)
            setEmailError('')
            if( data.password.length >= 6 ){
              setPassword(false)
              setPasswordError('')
              if(regPhone.test(data.phoneNo)){
                setPhoneNo(false)
                setPhoneNoError('')
                if(data.phoneNo.length === 10){
                    setPhoneNo(false)
                    setPhoneNoError('')
                    if(!otpBox){
                        axios.post('http://localhost:4000/get_otp', {phoneNo:data.phoneNo}).then((res)=>{
                            if (res.data.status === 'success') {
                                setOtpBox(true)
                            }else{
                                setPhoneNo(true)
                                setPhoneNoError('This phone no is already registered')
                            }
                        })
                    }else{
                        axios.post('http://localhost:4000/verify_otp', data).then((res)=>{
                            if (res.data.status === 'success') {
                                setUser(res.data.user)
                                setOtpBox(false)
                                navigate('/login')
                            }else{
                                setOtp(true)
                                setOtpError('Otp number in incorrect')
                            }
                        })
                    }
      
                  }else{
                    setPhoneNo(true)
                    setPhoneNoError('Please enter 10 digit')
                  }
              }else{
                setPhoneNo(true)
                setPhoneNoError('Enter valid phone no')
              }
            }else{
              setPassword(true)
              setPasswordError('Minimum 6 character')
            }
          }else{
            setEmail(true)
            setEmailError('Please enter valid Email')
          }
       }else{
        setFirstName(true)
        setFirstNameError('Please enter valid Name')
       }
      }else{
        setTotalRequired('Please enter your Details')
      }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            REGISTER
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ backgroundColor:'#ffc5c5' , borderRadius:'3px' , pl:2 }}>
            <p style={{ color:'red' }}>{totalRequired}</p>
          </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstName}
                  helperText={firstNameError}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={email}
                  helperText={emailError}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={password}
                  helperText={passwordError}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNo"
                label="Phone No"
                type="phoneNo"
                id="phoneNo"
                error={phoneNo}
                helperText={phoneNoError}
                />
              </Grid>
              { otpBox &&
                <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="OTP"
                type="otp"
                id="otp"
                error={otp}
                helperText={otpError}
                />
              </Grid>
              }
            </Grid>
            {otpBox ? 
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
            :
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Send otp
                </Button>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}