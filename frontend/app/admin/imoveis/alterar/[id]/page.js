'use client'
import FormImovel from "../../../../../app/components/forms/formImovel";
import Loading from "../../../../../app/components/loading";
import httpClient from "../../../../../app/utils/httpClient";
import { useEffect, useState } from "react";


export default function AlterarImovel({params: { id }}) {

    const [loading, setLoading] = useState(true);
    const [imovel, setImovel] = useState(null);

    function carregarImovel() {
        httpClient.get("/imovel/" + id)
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            console.log(r);
            setImovel(r);
            setLoading(false);

        })
        .catch(e => {
            console.error(r);
        })
    }

    useEffect(() => {
        carregarImovel();
    }, [])

    return (
        <div>
            {
                loading == true ?
                <Loading></Loading>
                :
                <FormImovel imovel={imovel}></FormImovel>
            }
            
        </div>
    )
}