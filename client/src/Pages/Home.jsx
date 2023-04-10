import { useContext, useEffect } from "react";
import Banner from "../Components/Banner";
import Navbar from "../Components/Navbar";
import { userContext } from "../Context/context";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate()

    const {user,setUser} = useContext(userContext)

    useEffect(()=>{
        if (user == null) {
            navigate('/login')
        }
    },[])
    
    return (
        <>
            <Navbar/>
            <Banner/>
        </>
     );
}
 
export default Home;