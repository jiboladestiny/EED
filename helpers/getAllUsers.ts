import axios from "axios";

const userData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user`);
        return res.data;
    } catch (error) {
   
        console.error("Error fetching user data:", error);
        return null; 
    }
};

export default userData;
