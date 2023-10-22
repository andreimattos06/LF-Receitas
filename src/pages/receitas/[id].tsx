import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Circle, CookingPot, Eye, PencilLine, Timer } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { ButtonAnimate } from '../../components/ButtonAnimate';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

interface Receita{
    id: string,          
    nome: string,          
    autor: string,        
    ingredientes: string,  
    modo_preparo: string,     
    tempo_preparo: number, 
    porcoes: string,       
    visitas: number,       
    data_criacao: string, 
  }

export default function DetalhesReceita(){
    const router = useRouter();
    const { id } = router.query;

    const [receita, setReceita] = useState<Receita>()
    const [foto, setFoto] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3333/receita/${id}`).then((response) => {
            setReceita(response.data['receita'])            
            setFoto(response.data['foto_url'])            
        })

    },[])

    
    const mapIngredientes = receita?.ingredientes.split(";")
    const map_modo_preparo = receita?.modo_preparo.split(";")
    
    
    return(
        <>
            <Header />

            <div className='flex flex-col items-center justify-center mt-24'>
                <text className='text-7xl font-medium text-redBase uppercase tracking-wide'>{receita?.nome}</text>
                <div className='text-black font-normal text-sm grid grid-flow-col justify-items-center gap-5 mt-1'>

                    <div>
                        Autor(a): {receita?.autor}
                    </div>
                    <div className='flex flex-row'>
                        <Timer size={22}/>
                        {receita?.tempo_preparo}min
                    </div>
                    <div className='flex flex-row gap-1'>
                        <CookingPot size={22} />
                        {receita?.porcoes} Porções
                    </div>

                    <div className='flex flex-row gap-1'>
                        <Eye size={22} />
                        {receita?.visitas} Visitas
                    </div>
      
                </div>
            </div>

            <div className='grid grid-cols-12 gap-5 mx-20 mt-24'>

                <div className='bg-white rounded-md p-6 w-full flex items-center justify-center col-span-5'>
                    <img src={foto} className="rounded-md overflow-hidden w-max"/>
                </div>

                <div className='flex flex-col gap-5 w-full col-span-7 bg-white rounded-md p-6'>
                    <div className=''>
                        <text className='text-redBase text-3xl font-medium'>Ingredientes:</text>
                        <ol className='text-black font-normal text-base'>

                            {mapIngredientes?.map((ingrediente, index) => {
                                let itemIngrediente = ingrediente.split('#')
                                return(
                                    <li key={index.toString()}>
                                        <div className='flex flex-row items-center gap-3 pt-5'>
                                            <div className='rounded-full bg-redBase text-white'>
                                                {/*index+1*/}
                                                <Circle size={18} />

                                            </div>
                                            <text>{itemIngrediente[0]} {itemIngrediente[1]} - {itemIngrediente[2]}.</text>
                                            

                                        </div>
                                    </li>
                                )
                            })}
                            
                        </ol>
                    </div>                    

                </div>

                <div className='flex flex-col gap-5 w-full col-span-12'>
                    <div className='bg-white p-6 rounded-md'>

                        <text className='text-redBase text-3xl font-medium'>Modo de Preparo:</text>
                        <ol className='text-black font-normal text-base'>

                            {map_modo_preparo?.map((etapa, index) => {                                
                                return(
                                    <li key={index.toString()}>
                                        <div className='flex flex-row items-center gap-3 pt-5'>

                                            <div className='rounded-full px-3 py-1 bg-redBase text-white'>
                                                {index+1}
                                            </div>
                                            <text>{etapa}.</text>                                            

                                        </div>
                                    </li>
                                )
                            })}
                            
                        </ol>

                    </div>
                </div>

                <div className="col-span-12 justify-self-end mt-5">
                    <Link href={`/receitas/editar/${id}`}>
                        <button className="bg-backgroundBase border-2 border-redBase p-3 text-redBase font-medium flex flex-row gap-5
                                            group/button hover:bg-redBase transition ease-in duration-500 shadow-buttonShadow hover:shadow-buttonShadow">
                            <div className="group-hover/button:text-white transition ease-in duration-500 flex flex-row items-center justify-center gap-3">
                                Editar
                                <PencilLine size={32} />
                            </div>
                            
                        </button>
                    </Link>
                </div>

            </div>

            

            <Footer />

        </>
    )
}
