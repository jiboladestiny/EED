import axios from "axios";

const summaryData = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/summary`);
        return res.data;
    } catch (error) {

        console.error("Error fetching course quiz:", error);
        return null;
    }
};

export default summaryData;
