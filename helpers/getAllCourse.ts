import axios from "axios";

const courseData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/course`);
        return res.data;
    } catch (error) {
        throw new Error("failed to fetchdata");
    }
};

export default courseData