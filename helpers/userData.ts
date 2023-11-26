const userData = async () => {
        const res = await fetch('/api/me')
        if (!res.ok) {
                // This will activate the closest `error.js` Error Boundary
                throw new Error('Failed to fetch data')
        }
        return res.json()
}

export default userData