import axios from "axios";

const quizData = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`);
        return res.data;
    } catch (error) {

        throw new Error("failed to fetchdata");
    }
};

export default quizData;
