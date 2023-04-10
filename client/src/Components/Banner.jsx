import { Box } from "@mui/material";
import { useContext } from "react";
import { userContext } from "../Context/context";

const Banner = () => {

    const {user,setUser} = useContext(userContext)
    
    return ( 
        <>
            {user == null ?
            <Box className='banner-box'>
                <Box>
                    <h1 className="banner-text">Welcome to MY WEB APP</h1>
                </Box>
            </Box>
            :
            <Box sx={{ textAlign:'center' }}>
                <h2>{user?.firstName + ' ' + user?.lastName}</h2>
                <h4>{user?.email}</h4>
                <h4>{user?.phoneNo}</h4>
            </Box>
            }
        </>
     );
}
 
export default Banner;