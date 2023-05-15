import Igame from "../Interfaces/Igame";
import api from "../config/api";

async function getGame(id: string) {
    try {
        const config = {
            headers: {
                Authorization: '9f31b35e8f78cb7a198c97b0d688c7f5fa6eeb046e78e0482d85072dee3e6ad36b95ebf80fc5128915f38efe055810ca9400d5b0a80bd090ac3af91aee0559e4',
            }
        };
        const data: Igame = await api.get(`games?id=${id}`, config).then(data => data.data);

        return data
    }
    catch {

    }
}

export default getGame;