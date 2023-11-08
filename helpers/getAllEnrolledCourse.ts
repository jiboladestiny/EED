import axios from "axios";

const enrolledCourseData = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/enroll`);
        return res.data;
    } catch (error) {

        console.error("Error fetching course data:", error);
        return null;
    }
};

export default enrolledCourseData;
