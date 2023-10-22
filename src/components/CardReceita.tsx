import Link from "next/link";
import { MagnifyingGlass, Timer } from "phosphor-react"
import { ReactElement } from "react"
import { ButtonAnimate } from "./ButtonAnimate"

interface CardReceitaProps{
    id: string;
    foto: string;
    nome: string;
    porcoes: string;
    tempo_preparo: number;

}

export function CardReceita(props: CardReceitaProps){


    return(
        
        <div className="bg-white pt-14 rounded-md group/card hover:bg-hoverBase transition-all duration-700">

            <div className="flex justify-center items-center">

                <div className="absolute bg-white rounded-full min-w-[100px] min-h-[100px] flex justify-center items-center 
                                invisible group-hover/card:visible group-hover/card:animate-ping-padrao"
                                >
                    <span className="text-5xl">😋</span>
                </div>
                
                <img src={props.foto} className="rounded-md w-5/6 h-52 overflow-hidden"/>                  
                     
            </div>

            <div className="flex justify-between pt-12 px-10 pb-10">
                <div className="flex flex-col gap-3">
                    
                    <text className="text-4xl text-redBase font-normal">
                        {props.nome}
                    </text>

                    <text className="text-xl">      
                        {props.porcoes} Porções        
                    </text>

                    <div className="text-2xl text-redBase font-normal flex flex-row items-center gap-1">

                        <Timer size={22}/>
                        <text>
                            {props.tempo_preparo} min
                        </text>
                        
                        
                    </div> 

                    
                </div>

                <div className="flex items-center">
                    <Link href={`/receitas/${props.id}`}>
                        <ButtonAnimate texto={"Detalhes"} left_right={0} icon={<MagnifyingGlass size={32}/>} />
                    </Link>
                </div>
            </div>

        </div>

            
    )
}