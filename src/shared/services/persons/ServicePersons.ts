import { api } from "../api";

export interface IPerson {
    id: string,
    image: string,
    name: string,
    email: string,
    gender: string,
    dateBirth: string,
    phone: string,
    address: string,
}


const getAll = async(page=1, limit=10, filter="") => {
    try {
        const urlRelative = `/?page=${page}&result=${limit}`;

        const data = await api.get<IPerson[]>(urlRelative);

        if(data){
            console.log(data);
            return;
        }

        throw new Error(data);

    } catch (error) {
        console.log(error);
        return;
    }
};


export const ServicePersons = {
    getAll
};
