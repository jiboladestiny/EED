import axios from "axios";

const summaryData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/summary`);
        return res.data;
    } catch (error) {

        console.error("Error fetching course quiz:", error);
        return null;
    }
};

export default summaryData;
