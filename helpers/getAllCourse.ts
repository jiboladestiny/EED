import axios from "axios";

const courseData = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/course`);
        return res.data;
    } catch (error) {

        console.error("Error fetching course data:", error);
        return null;
    }
};

export default courseData;
