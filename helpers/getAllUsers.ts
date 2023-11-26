
const userData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user`);
        if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
        }
        return res.json()
};

export default userData;
