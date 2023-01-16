type Props = {
    label:string;
    value:string|number
}

export const LeftSideInfo = ({label,value}:Props) => {
    return(
        <div className="pt-6">
           <div className="text-[25px] text-[#abacb1]">{label}</div>
           <div className="pt-3 text-[#14163d] text-[35px]" >{value}</div> 
        </div>
    )
}