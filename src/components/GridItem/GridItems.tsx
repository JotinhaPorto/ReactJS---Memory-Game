import { GridItemsTp } from "../../types/GridItemsTp"
import b7logo from '../../assets/b7.svg'
import { Items } from "../../data/Items";
import * as C from './styles'
type Props = {
    data: GridItemsTp;
    onClickProp: () => void
}

export const GridItems = ({ data, onClickProp }: Props) => {
    return (
        <C.Container showBackGround={data.permanentShown || data.shown} onClick={onClickProp} >
            {!data.shown && !data.permanentShown &&
                <C.Icon opacity={.1} src={b7logo}  />
            }
            {(data.shown || data.permanentShown) && data.item !== null &&
                <C.Icon src={Items[data.item].icon}  />
            }
        </C.Container>
    )
}