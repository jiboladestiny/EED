import axios from "axios";

const quizData = async () => {
    try {
        const res = await axios.get(`${process.env.BASE_URL}/api/quiz`);
        return res.data;
    } catch (error) {

        console.error("Error fetching course quiz:", error);
        return null;
    }
};

export default quizData;
