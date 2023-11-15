
const quizData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`);
        if (!res.ok) throw new Error("failed to fetchdata");
        return res.json();
};

export default quizData;