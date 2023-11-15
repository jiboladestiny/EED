
const userData = async () => {
  
                const res = await fetch('/api/me')
                if (!res.ok) throw new Error("failed to fetchdata");
                return res.json();
}


export default userData