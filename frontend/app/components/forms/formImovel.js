'use client'
import Link from "next/link";
import {useEffect, useRef, useState} from 'react'
import httpClient from "../../utils/httpClient";

export default function FormImovel({ imovel }) {

    const descricao = useRef();
    const cep = useRef();
    const endereco = useRef();
    const bairro = useRef();
    const cidade = useRef();
    const valor = useRef();
    const disponivel = useRef();
    const imagens = useRef();
    const [listaImagens, setListaImagens] = useState([]);
    const [alteracao, setAlteracao] = useState(false);

    function gravarImovel() {
        if(descricao.current.value && cep.current.value 
            && endereco.current.value && bairro.current.value
            && valor.current.value && cidade.current.value) {
                const formData = new FormData();
                

                formData.append("descricao", descricao.current.value);
                formData.append("cep", cep.current.value);
                formData.append("endereco", endereco.current.value);
                formData.append("bairro", bairro.current.value);
                formData.append("valor", valor.current.value);
                formData.append("cidade", cidade.current.value);
                for(let i = 0; i<imagens.current.files.length; i++)
                    formData.append("imagens", imagens.current.files[i]);
                formData.append("disponivel", disponivel.current.checked == true ? "S" : "N");

                httpClient.postFormData("/imovel", formData)
                .then(r=> {
                    return r.json();
                })
                .then(r=> {
                    console.log(r);
                })
                .catch(e=> {
                    console.error(e);
                })
        }
        else {
            alert("Preencha os campos corretamente!");
        }
    }

    function carregarPrevias() {
        if(imagens.current.files.length > 0) {
            const files = imagens.current.files;
            let lista = [];

            for(let i = 0; i<files.length ; i++) {
                lista.push(URL.createObjectURL(files[i]));
            }

            setListaImagens(lista);
        }
    }

    function alterarImovel() {
        if(descricao.current.value && cep.current.value 
            && endereco.current.value && bairro.current.value
            && valor.current.value && cidade.current.value) {
                const formData = new FormData();
                

                formData.append("id", imovel.id);
                formData.append("descricao", descricao.current.value);
                formData.append("cep", cep.current.value);
                formData.append("endereco", endereco.current.value);
                formData.append("bairro", bairro.current.value);
                formData.append("valor", valor.current.value);
                formData.append("cidade", cidade.current.value);
                for(let i = 0; i<imagens.current.files.length; i++)
                    formData.append("imagens", imagens.current.files[i]);
                formData.append("disponivel", disponivel.current.checked == true ? "S" : "N");

                httpClient.putFormData("/imovel", formData)
                .then(r=> {
                    return r.json();
                })
                .then(r=> {
                    alert(r.msg);
                })
                .catch(e=> {
                    console.error(e);
                })
        }
        else {
            alert("Preencha os campos corretamente!");
        }
    }

    function consultarCep() {

        if(cep.current.value) {

            fetch(`https://viacep.com.br/ws/${cep.current.value}/json/`)
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r) {
                    endereco.current.value = r.logradouro;
                    bairro.current.value = r.bairro;
                    cidade.current.value = r.localidade;
                }
            })
            .catch(e => {
                console.error(e);
            })
        }   
    }

    useEffect(() => {
        console.log(imovel);
        //se true está em alteração
        if(imovel) {
            descricao.current.value = imovel.descricao;
            endereco.current.value = imovel.endereco;
            bairro.current.value = imovel.bairro;
            cidade.current.value = imovel.cidade;
            cep.current.value = imovel.cep;
            valor.current.value = imovel.valor;
            disponivel.current.checked = imovel.disponivel == "S" ? true : false

            setAlteracao(true);
            //converter base64 para File
            let listaImgs = [];
            if(imovel.imagens.length > 0) {
                imovel.imagens.forEach((value, index) => {
                    const file = new File(
                        [Uint8Array.from(atob(value.blob), (m) => m.codePointAt(0))],
                        'myfilename.jpeg',
                        { type: "image/jpeg" }
                     );

                     listaImgs.push(URL.createObjectURL(file));
                })
            }


            setListaImagens(listaImgs);
        }
    }, [])

    return (
        <div>
            <h1>Cadastro de imóvel</h1>
            <hr></hr>

            <div>
                <div className="form-group">
                    <label>Descrição</label>
                    <input ref={descricao} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>CEP</label>
                    <input onBlur={consultarCep} ref={cep} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Endereço</label>
                    <input ref={endereco} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Bairro</label>
                    <input ref={bairro} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Cidade</label>
                    <input ref={cidade} className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Valor</label>
                    <input ref={valor} type="number" className="form-control"></input>
                </div>
                
                <div className="form-group">
                    <label>Imagens</label>
                    <input onChange={carregarPrevias} ref={imagens} type="file" multiple className="form-control"></input>
                </div>

                <div>
                    <span>Imagens selecionadas</span>
                    <br></br>
                    <div style={{display: 'grid', gridTemplateColumns: '150px 150px 150px', gap: '10px'}}>
                    {
                        listaImagens.length > 0 ?
                        
                            listaImagens.map((value, index) => {
                                return <div>
                                            <img width={150} src={value}></img>
                                        </div>
                            })
                            :
                            <small>Nenhuma imagem selecionada</small>
                    }
                    </div>

                </div>

                <div style={{marginTop: '50px'}} className="form-group">
                    <label><input ref={disponivel} type="checkbox"></input> Disponível para locação</label>
                </div>
            </div>

            <div>
                <button onClick={alteracao == true ? alterarImovel : gravarImovel} className="btn btn-primary">
                    {alteracao == true ? 'Alterar' : 'Cadastrar'}
                </button>
                <Link className="btn btn-default" href="/admin/imoveis">Voltar</Link>
            </div>
        </div>
    )
}