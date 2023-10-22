import { Info, MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { CardReceita } from "../components/CardReceita";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import * as Tooltip from '@radix-ui/react-tooltip';
import axios from "axios";


interface Receita{      
    nome: string,                
    fotos: string,           
    tempo_preparo: number, 
    porcoes: string, 
    id: string,  
    foto_url: string,
  }
  

export default function BuscaDetalhada(){

    const [receitas, setReceitas] = useState<Receita[]>()
    const [busca, setBusca] = useState("");

    function realizarBusca(){

        let string_array = busca.split(",")
        string_array = string_array.map(cada => {
            cada = cada.trimStart()
            cada = cada.trimEnd()
            
            return cada;

        })

        axios.post(("http://localhost:3333/buscadetalhada"), {
            
            ingredientes: string_array,
        }).then((response) => {
            setReceitas(response.data)
        })

    }


    return(

        <>
        <Header />

        <div className='mt-40 flex flex-col items-center justify-between'>

            <div className='w-2/5 h-14 border-2 border-redBase text-redBase text-lg flex flex-row items-center bg-white shadow-buttonShadow'>
                
                <Tooltip.Provider>
                    <Tooltip.Root delayDuration={0}>
                        <Tooltip.Trigger>
                            <span className="flex items-center">
                                <button disabled>
                                    <Info size={32} />
                                </button>
                                
                            </span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-white rounded-lg text-redBase p-5 border-redBase border-2">
                                <span>
                                    A busca retornará apenas receitas que utilizem TODOS os ingredientes.
                                </span>
                                <span>
                                    <br/>Escreva os ingredientes separados por ' , ' (vírgula).
                                </span>
                                <Tooltip.Arrow className="fill-redBase"/>
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>


                <input className='w-full h-full pl-1 placeholder:opacity-70 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none' 
                    onChange={(event) => setBusca(event.target.value)}    placeholder='Farinha; Trigo; Arroz...'>
                </input>
                <button className='border-l-2 border-redBase h-full w-1/12 py-1 hover:bg-redBase hover:text-white duration-700 flex items-center justify-center'
                        onClick={realizarBusca}>
                    <MagnifyingGlass size={30} />
                </button>
            </div>       
            
        </div>


        <div className='mx-16 text-red-700 flex flex-row items-center mt-32'>
            <hr className='border-2 border-red-600 w-10'></hr>
            <text className='text-6xl px-3 shrink-0'>Resultado da Busca</text>
            <hr className='border-2 border-red-600 w-full'></hr>
        </div>

        <div className='grid grid-cols-4 gap-3 mx-16 mt-20 mb-80'>

            {receitas?.map(cada => {
            return(
                <CardReceita id={cada.id} foto={cada.foto_url} nome={cada.nome} porcoes={cada.porcoes} tempo_preparo={cada.tempo_preparo}/>          
            )
            
            })}       


        </div>

        <Footer />
            
        
        </>
    )
}