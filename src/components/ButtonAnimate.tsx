import { ReactElement } from "react"

interface ButtonAnimateProps{
    texto: string,
    left_right: number,
    icon: ReactElement;

}

export function ButtonAnimate(props: ButtonAnimateProps){


    return(
        <button className="border-2 border-redBase p-3 text-redBase font-medium flex flex-row gap-5 
                            group/button hover:bg-redBase transition ease-in duration-500 items-center shadow-buttonShadow hover:shadow-buttonShadow">
            <div className="group-hover/button:text-white transition ease-in duration-500">

             {props.left_right == 0 ? props.icon : null}

            </div>
            

            <span className="align-text-bottom group-hover/button:text-white transition ease-in duration-500">{props.texto}</span>
            

            <div className="group-hover/button:text-white transition ease-in duration-500">

             {props.left_right == 1 ? props.icon : null}

            </div>


        </button>
    )
}