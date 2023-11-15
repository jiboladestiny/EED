const courseData = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/course`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("failed to fetch data");
            }
            return res.json();
        });
};

export default courseData;
