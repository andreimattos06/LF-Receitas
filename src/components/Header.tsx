import Link from "next/link";
import { Drop, ForkKnife, List, PlusCircle } from "phosphor-react";
import { ButtonAnimate } from "./ButtonAnimate";

export function Header(){


    return(
        <div className='flex flex-row justify-between items-center mx-14 mt-4'>
            <div className='text-redBase w-2/12 -mb-16'>
                <img src="/logo.png"/>
            </div>

            <div className='gap-3 flex flex-row'>
                <Link href="../">
                    <ButtonAnimate texto={'Lista de Receitas'} left_right={1} icon={<ForkKnife size={32}/>} />
                </Link>

                <Link href="../novareceita">
                    <ButtonAnimate texto={'Nova Receita'} left_right={0} icon={<PlusCircle size={32}/>} />
                </Link>

                
            </div>

            
            
        </div>
    )
}