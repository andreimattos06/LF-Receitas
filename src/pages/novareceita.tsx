import { ArrowsDownUp, PaperPlane, PlusCircle, Trash, UploadSimple } from "phosphor-react";
import { useRef, useState } from "react";
import { ButtonAnimate } from "../components/ButtonAnimate";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Combobox } from '@headlessui/react'
import axios from "axios";
import { Modal } from "@nextui-org/react";
import Link from "next/link";

interface listaIngredientes{
    quantidade: string,
    unidade: string,
    nome: string,
}

const unidades_de_medidas = [
    "Unidade(s)", "Kg", "Grama(s)", "Mg", "Litro(s)", "ML", "Xícara(s) de Chá", "Xícara(s) de Café", "Colher(es) de Sopa", "Colher(es) de Chá", "Colher(es) de Café",
]


export default function NovaReceita(){

    const [caracter_nomereceita, setCaracterNomereceita] = useState(0);
    const [autor_receita, setAutorReceita] = useState(0);
    const [ingredientes, setIngredientes] = useState<listaIngredientes[]>([{ quantidade:"", nome:"", unidade:""}]);
    const [modo_preparo, setModoPreparo] = useState([""]);
    const [query, setQuery] = useState('')
    const [nome_receita, setNomeReceita] = useState("")
    const [autor, setAutor] = useState("")
    const [tempo_preparo, setTempoPreparo] = useState("")
    const [porcao, setPorcao] = useState("")
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const [edit_key, setEditKey] = useState("")
    const [foto, setFoto] = useState("")

    const fileInputRef = useRef<HTMLInputElement>(null);
    /* --------------Handler para fechar Modal Após Envio -------------- */
    const closeHandler = () => {
        setVisible(false);
    };
    

    /* --------------Método para filtrar opções mostradas no AutoComplete-------------- */
    const filteredPeople =
    query === ''
      ? unidades_de_medidas
      : unidades_de_medidas.filter((unidade_de_medidas) => {
          return unidade_de_medidas.toLowerCase().includes(query.toLowerCase())
        })



    function onChangeQuantidade(event: EventTarget, index) {   

        const nextArray = ingredientes.map((c, i) =>{
            if (i === index){
                // @ts-ignore
                return { nome: c.nome, unidade: c.unidade, quantidade: event.value}
            }
            else{
                return c
            }
        })
        
        setIngredientes(nextArray)       
            
    }

    function onChangeNome(event: EventTarget, index) {   

        const nextArray = ingredientes.map((c, i) =>{
            if (i === index){   
                // @ts-ignore
                return { nome: event.value, unidade: c.unidade, quantidade: c.quantidade}
            }
            else{
                return c
            }
        })
        
        setIngredientes(nextArray)       
          
    }

    function onChangeModoPreparo(event: EventTarget, index) {   

        const nextArray = modo_preparo.map((c, i) =>{
            if (i === index){
                // @ts-ignore
                return event.value
            }
            else{
                return c
            }
        })
        
        setModoPreparo(nextArray)       
          
    }

    function onChangeUnidade(value: string, index: number){

        let array: listaIngredientes[] = ingredientes
        array[index.toString()].unidade = value;
       
        setQuery(value)
        setIngredientes(array)
        

    }

    function onDeleteIngrediente(indexParam: number){

        let array: listaIngredientes[] = ingredientes
        
        array.splice(indexParam, 1)

        
        setIngredientes(array)
        setQuery(query+1)

    }

    function onDeleteModoPreparo(indexParam: number){

        let array = modo_preparo
        
        array.splice(indexParam, 1)

        
        setModoPreparo(array)
        setQuery(query+1)

    }

    function handleUploadClick(){
        if (fileInputRef.current) {

            fileInputRef.current.click();
        }
    }

    function handleUploadFile(evento: React.ChangeEvent<HTMLInputElement>){   
        const fr = new FileReader()
        
        
        fr.onload = () => {
            const dataUrl = fr.result as string;
            setFoto(dataUrl);
        }
        fr.readAsDataURL(evento.target.files[0]) 


    }

    async function onSubmitEnviar (event){
        event.preventDefault()
        let string_ingredientes = ingredientes.map((cada) => {
            return cada.quantidade + "#" + cada.unidade + "#" + cada.nome + ";"
        })

        let string_modo_preparo = modo_preparo.map((cada) => {
            return cada + ";" 
        })

        // @ts-ignore
        string_ingredientes = string_ingredientes.join('')
        string_ingredientes = string_ingredientes.slice(0, -1)
        // @ts-ignore
        string_modo_preparo = string_modo_preparo.join('')
        string_modo_preparo = string_modo_preparo.slice(0, -1)



        axios.post('http://localhost:3333/novareceita', {
            nome:  nome_receita  ,      
            autor : autor,       
            ingredientes : string_ingredientes,
            modo_preparo : string_modo_preparo,
            fotos : "",       
            tempo_preparo : Number(tempo_preparo), 
            porcoes : porcao,       
            visitas : 0,
            foto: foto, 
        }).then((response) => {
            if (response.data.edit_key != null){
                setEditKey(response.data.edit_key)
                handler()

            }
        }).catch((error) => {
        })


    }


    return(
        <>
        
            <Header />

            {/* --------------Modal exibido após envio da receita -------------- */}
            <div >
                <Modal
                    scroll
                    preventClose
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                    
                >
                    <Modal.Header >
                        <div className="text-redBase text-2xl font-medium">
                            <span>Receita Adicionada com Sucesso!</span>                            
                        </div>
                    </Modal.Header>
                    <Modal.Body >  

                            <div className="flex flex-col items-center justify-center font-light text-justify">
                                <span>A receita foi adicionada com sucesso, para fazer qualquer alteração é necessário possuir em mãos o código abaixo, portanto:</span>
                                <span className="font-bold"> Anote em algum lugar seguro!!!</span>
                                <span className="text-redBase font-semibold pt-5 underline">{edit_key}</span>
                            </div>                         
                                                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Link href="/" onClick={closeHandler}>
                            <ButtonAnimate texto={"OK!"} left_right={1} icon={undefined} />      
                        </Link>             
                    </Modal.Footer>
                </Modal>
            </div>

            
                <div className='flex items-center justify-center mt-28 text-8xl font-medium text-redBase uppercase tracking-wide'>
                    <text>Nova Receita</text>
                </div>

                <div className="flex flex-row justify-center mx-20 gap-5 mt-24">

                    <div className="bg-white flex flex-col w-6/12 pt-6 pb-10 px-8 rounded-md gap-10">
                        <div className="flex items-center justify-center text-redBase font-medium text-3xl">
                            <span>Informações da Receita</span>

                        </div>

                        <div className="flex flex-col">
                            <span className="text-redBase font-semibold text-xl">Nome da Receita:</span>
                            <div className="flex flex-col">
                                <input value={nome_receita} onChange={(event) => {setCaracterNomereceita(event.target.value.length)
                                                            setNomeReceita(event.target.value)}} 
                                                className="border-b-[1px] border-redBase w-full text-base font-light focus:outline-none"></input>
                                <span className="font-light text-xs self-end">{caracter_nomereceita}/60</span>
                            </div>                  
                        </div>

                        <div className="flex flex-col">
                            <span className="text-redBase font-semibold text-xl">Autor(a):</span>
                            <div className="flex flex-col">
                                <input value={autor} onChange={(event) => {setAutorReceita(event.target.value.length)
                                                            setAutor(event.target.value)}} 
                                                className="border-b-[1px] border-redBase w-full text-base font-light focus:outline-none"></input>
                                <span className="font-light text-xs self-end">{autor_receita}/60</span>
                            </div>                  
                        </div>

                        <div className="flex flex-col">
                            <span className="text-redBase font-semibold text-xl">Tempo de preparo (minutos):</span>
                            <div className="flex flex-col">
                                <input value={tempo_preparo} onChange={(event) => {setTempoPreparo(event.target.value)}} 
                                                className="border-b-[1px] border-redBase w-full text-base font-light focus:outline-none"></input>
                            </div>                  
                        </div>

                        <div className="flex flex-col">
                            <span className="text-redBase font-semibold text-xl">Quantidade de Porções:</span>
                            <div className="flex flex-col">
                                <input value={porcao} onChange={(event) => {setPorcao(event.target.value)}} 
                                                className="border-b-[1px] border-redBase w-full text-base font-light focus:outline-none"></input>
                            </div>                  
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-redBase font-semibold text-xl">Foto:</span>
                            <img src={foto} className="max-w-xl w-5/6 max-h-fit"/>
                            
                            <div>
                                    <button onClick={handleUploadClick}>
                                        <ButtonAnimate texto={"Upload"} left_right={0} icon={<UploadSimple size={24}/>} />  
                                    </button>
                                    <input type="file" onChange={(event) => handleUploadFile(event)} id="foto-upload" ref={fileInputRef} className="hidden"/>                        
                            </div>
                                                
                                            
                        </div>


                    </div>
                
                    <div className="bg-white flex flex-col w-6/12 pt-6 pb-10 px-8 rounded-md gap-10">
                        <div className="flex items-center justify-center text-redBase font-medium text-3xl">
                            <span>Ingredientes</span>

                        </div>

                        <div>
                            <ul>
                                {ingredientes?.map((ingrediente, index) =>{
                                    return( 
                                        <li className="pb-5" key={`"liingredientes"+${index}`}>
                                            <div  className="flex flex-row gap-5">
                                                <div className='rounded-full px-3 py-1 bg-redBase text-white flex justify-center items-center'>
                                                        {index+1}
                                                </div>

                                                <div className="flex flex-row w-full">
                                                    <input placeholder="100" name="quantidade" onChange={(event) => onChangeQuantidade(event.target, index)} value={ingrediente.quantidade} id={index.toString()} key={"nome"+index} className="border-b-[1px] border-redBase w-2/12 text-base font-light focus:outline-none"></input>

                                                    <div className="relative flex px-3">
                                                        <Combobox key={index} value={ingrediente.unidade} onChange={(event) => onChangeUnidade(event, index)}>
                                                            <div className="relative items-end border-redBase border-b-2">
                                                                <Combobox.Input placeholder="Gramas" className="focus:outline-none -z-10 bg-white w-auto text-md font-light" onChange={(event) => setQuery(event.target.value)} />
                                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                <ArrowsDownUp
                                                                    className="h-5 w-5 text-redBase"
                                                                    aria-hidden="true"
                                                                />
                                                                </Combobox.Button>
                                                                <Combobox.Options className="absolute bg-white border-redBase border-2 z-10 flex flex-col gap-2 mt-1 rounded-md">
                                                                    {filteredPeople.map((person) => (
                                                                    <Combobox.Option className="w-full hover:bg-redBase hover:text-white px-3 py-1" key={person} value={person}>
                                                                        {person}
                                                                    </Combobox.Option>
                                                                    ))}
                                                                </Combobox.Options>
                                                            </div>
                                                        </Combobox>
                                                    </div>

                                                    <div>
                                                        <span className="pr-3">-</span>
                                                    </div>

                                                    <input placeholder="Farinha" onChange={(event) => onChangeNome(event.target, index)} value={ingrediente.nome} name="nome" id={index.toString()} key={"quantidade"+index} className="border-b-[1px] border-redBase w-full text-base font-light focus:outline-none"></input>

                                                    <div className="flex justify-items-center items-center pl-2 text-redBase">
                                                        <button key={`${index}+del`} className="hover:bg-redBase p-1 hover:text-white rounded-lg" onClick={() => onDeleteIngrediente(index)}>
                                                            <Trash size={20} weight="bold"/>
                                                        </button>
                                                    </div>
                                        
                                                </div> 

                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <button className="rounded-full text-redBase" onClick={() => {
                                setIngredientes([...ingredientes, {quantidade:"", nome:"", unidade:""}])
                                }}>
                                <PlusCircle size={32} weight="light" />
                            </button>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col mx-20 mt-5 bg-white pt-6 pb-10 px-8">
                    
                    <div className="flex items-center justify-center text-redBase font-medium text-3xl">
                        <span>Modo de Preparo</span>
                    </div>

                    <div>

                        <ul className="flex flex-col gap-5">
                            {modo_preparo.map((cada, index) => {
                                return(
                                    <li key={index}>
                                        <div className="flex flex-row gap-3 items-center justify-center">
                                            <div className='rounded-full px-3 py-1 bg-redBase text-white flex justify-center items-center'>
                                                {index+1}
                                            </div>

                                            <div className="w-full">
                                                <textarea value={cada} onChange={(event) => onChangeModoPreparo(event.target, index)}
                                                        className="w-full border-b-2 border-r-2 border-redBase resize-none rounded-br-md focus:outline-none text-light font-light"></textarea>
                                            </div>

                                            <div>
                                                <button className="text-redBase hover:bg-redBase p-1 hover:text-white rounded-lg"
                                                        onClick={() => onDeleteModoPreparo(index)}>
                                                    <Trash size={20} weight="bold"/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>

                        <button className="rounded-full text-redBase mt-5" onClick={() => {
                            setModoPreparo([...modo_preparo, ""])
                            }}>
                            <PlusCircle size={32} weight="light" />
                        </button>

                    </div>

                </div>

                <div className="flex justify-end">
                    <button onClick={(event) => onSubmitEnviar(event)} className="bg-white border-2 border-redBase p-3 text-redBase font-medium flex flex-row gap-5 mx-20 mt-5
                                        group/button hover:bg-redBase transition ease-in duration-500 shadow-buttonShadow hover:shadow-buttonShadow">
                        <div className="group-hover/button:text-white transition ease-in duration-500 flex flex-row items-center justify-center gap-3">
                            Enviar
                            <PaperPlane size={32} />
                        </div>
                        
                    </button>
                </div>
                        
            <Footer />

        </>
    )
}