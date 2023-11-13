import axios from "axios";

const enrolledCourseData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/enroll`);
        return res.data;
    } catch (error) {

        throw new Error("failed to fetchdata");
    }
};

export default enrolledCourseData;
