import area from '@/json/area.json';

export const communityIdToArea = (id) => {
    let district
    const city = area.find(city => {
        const dis = city.children.find(dis => {
            return dis.value === id
        })
        if (dis) {
            district = dis
            return true
        } else {
            return false
        }
    })
    return {
        city,
        district
    }
};
