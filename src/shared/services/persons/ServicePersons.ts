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

export interface IInfo {
    page:number,
    results:number,
    seed: string
}

type TResponsePersonProps = {
    persons: IPerson[],
    info: IInfo
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

const national = ["AU", "BR", "CA", "CH", "DE", "DK", "ES", "FI", "FR", "GB", "IE", "IN", "IR", "MX", "NL", "NO", "NZ", "RS", "TR", "UA", "US"];


const verifyName = (persons:IPerson[], names:string[]):IPerson[] => {
    const data: IPerson[] = [];
    for (const person of persons) {
        for(const name of names){
            if (person.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                data.push(person);
            }
        }
    }
    return data;
};

const getAll = async ({page, seed = "",gender = "",filter = "", limit = 10}:{page:number, seed?: string, gender?:string, nat?:string,filter?:string, limit?:number}): Promise<TResponsePersonProps | Error> => {
    let response:any;
    try {
        let urlRelative = "";
        const names:string[] = [];
        let nat = "";
        if(filter.includes(",")){
            const params = filter.split(",");
            params.filter(n => {
                if (national.find(f => f === n.toLocaleUpperCase().trim())){
                    nat += `${n},`.trim();
                }else{
                    names.push(n.trim());
                }
            });
        }else{
            if(national.find(f => f === filter.toLocaleUpperCase().trim())){
                nat = filter;
            }else{
                names.push(filter);
            }
        }
        urlRelative = `/?page=${page}&results=${limit}&gender=${gender}&nat=${nat.includes(",") ? nat.substring(0, nat.length - 1) : nat }&seed=${seed}`;
        console.log(urlRelative);

        response = await api.get<TResponsePersonProps>(urlRelative);

        if(response){
            console.log(names.length);
            if(filter.includes(",")){
                return {
                    info: response.data.info,
                    persons: names.length ? verifyName(modifyData(response), names) : modifyData(response)
                };


            }else{
                console.log(!names.length);
                if (!names.length) {
                    if(nat){
                        return {
                            info: response.data.info,
                            persons: modifyData(response),
                        };
                    }else{
                        return {
                            info: response.data.info,
                            persons: verifyName(modifyData(response), names),
                        };
                    }

                }else{
                    return {
                        info: response.data.info,
                        persons: verifyName(modifyData(response), names),
                    };
                }
            }

        }

        return Error();

    } catch (error) {
        console.log(error);
        return error as Error;
    }
};

export const ServicePersons = {
    getAll
};
