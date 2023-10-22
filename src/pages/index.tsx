import { Inter } from '@next/font/google'
import { Cake, MagnifyingGlass, MagnifyingGlassPlus } from 'phosphor-react'
import { ButtonAnimate } from '../components/ButtonAnimate'
import { CardReceita } from '../components/CardReceita'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

interface Receita{      
  nome: string,                
  fotos: string,           
  tempo_preparo: number, 
  porcoes: string, 
  id: string,  
  foto_url: string,
}

export default function Home() {

  const [receitasRecentes, setReceitasRecentes] = useState<Receita[]>()
  const [receitasMaisVisitadas, setReceitasMaisVisitadas] = useState<Receita[]>()
  const [busca, setBusca] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3333/receitasrecentes').then((response) => {
          setReceitasRecentes(response.data)
      
    })
    
    axios.get('http://localhost:3333/receitasmaisvisitadas').then((response) => {
        setReceitasMaisVisitadas(response.data)          
    })
    
  },[])

//https://mrpops.ua/en/catalog/

  return (
    <>
      
      <Header />

      <div className='flex items-center justify-center mt-14 text-[9rem] font-medium text-redBase uppercase tracking-wide'>
        <text>Receitas</text>
      </div>

      <div className='mt-20 flex flex-col items-center justify-between'>

        <div className='w-2/5 h-14 border-2 border-redBase text-redBase text-lg flex flex-row items-center bg-white shadow-buttonShadow'>
          <input className='w-full h-full pl-1 placeholder:opacity-70 placeholder:text-zinc-400 placeholder:font-normal focus:outline-none' 
                  onChange={(event) => setBusca(event.target.value)}  placeholder='Sopa de Legumes...'>
          </input>
          <Link href={`/busca?busca=${busca}`} className='border-l-2 border-redBase h-full w-1/12 py-1 hover:bg-redBase hover:text-white duration-700 flex items-center justify-center'>
            <MagnifyingGlass size={30} />
          </Link>
        </div>       
        
      </div>

      <div className='flex flex-row items-center justify-center gap-5 mt-10'>

        <ButtonAnimate texto={'Pesquisa Avançada'} left_right={1} icon={<MagnifyingGlassPlus size={32}/>} />

        <Link href={`/buscadetalhada`}>
          <ButtonAnimate texto={'Pesquisa Por Ingredientes'} left_right={0} icon={<Cake size={32} />}/>
        </Link>

      </div>

      <div className='mx-16 text-red-700 flex flex-row items-center mt-32'>
        <hr className='border-2 border-red-600 w-10'></hr>
        <text className='text-6xl px-3'>Novidades</text>
        <hr className='border-2 border-red-600 w-full'></hr>
      </div>

      <div className='grid grid-cols-4 gap-3 mx-16 mt-20'>

        {receitasRecentes?.map(cada => {
          return(
            <CardReceita id={cada.id} foto={cada.foto_url} nome={cada.nome} porcoes={cada.porcoes} tempo_preparo={cada.tempo_preparo}/>          
          )
          
        })}       


      </div>

      <div className='mx-16 text-red-700 flex flex-row items-center mt-32'>
        <hr className='border-2 border-red-600 w-10'></hr>
        <text className='text-6xl px-3 shrink-0'>Mais Visitadas</text>
        <hr className='border-2 border-red-600 w-full'></hr>
      </div>

      <div className='grid grid-cols-4 gap-3 mx-16 mt-20'>
        
        {receitasMaisVisitadas?.map(cada => {
            return(
              <CardReceita id={cada.id} foto={cada.foto_url} nome={cada.nome} porcoes={cada.porcoes} tempo_preparo={cada.tempo_preparo}/>          
            )
            
          })} 

      </div>

      <Footer />

    </>
  )
}
