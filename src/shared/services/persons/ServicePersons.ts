import { AxiosResponse } from "axios";
import { format } from "date-fns";
import { api } from "../api";

export interface IPerson {
    id: string,
    image: string[],
    name: string,
    email: string,
    gender: string,
    dateBirth: string,
    phone: string,
    address: string,
    nationality:string,
    url?:string,
}

const modifyData = ({ data }: AxiosResponse):IPerson[] => {
    let person:IPerson[] = [];

    data.results.forEach((p: any) => {
        person = [...person, {
            id: p.login.uuid,
            name: `${p.name.title} ${p.name.first} ${p.name.last}`,
            email: p.email,
            gender: p.gender,
            phone: p.cell,
            address: `${p.location.street.name}, ${p.location.street.number}, ${p.location.city}, ${p.location.state}, ${p.location.country}`,
            nationality: p.nat,
            dateBirth: format(new Date(p.dob.date), "dd/MM/yyyy"),
            image: p.picture,
        }];
    });

    return person;

};

const getAll = async (page: number,filter = "", limit = 10): Promise<IPerson[] | Error> => {
    try {
        let urlRelative = "";

        urlRelative = `/?page=${page}&results=${limit}`;

        console.log(urlRelative);

        const response = await api.get<IPerson[]>(urlRelative);
        if(response){
            return modifyData(response);
        }

        throw new Error(response);

    } catch (error) {
        return error as Error;
    }
};

export const ServicePersons = {
    getAll
};
