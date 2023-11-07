import axios from "axios"

const userData = async () => {
    try {
        const res = await axios.get('/api/me')
        return res.data
    } catch (error) {
        
    }
}

export default userData