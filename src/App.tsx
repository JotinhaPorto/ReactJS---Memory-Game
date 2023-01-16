import { LeftSideInfo } from "./components/LeftSideInfo"
import { GridItems } from "./components/GridItem/GridItems"
import { useEffect, useState } from "react"
import { Items } from "./data/Items"
import { GridItemsTp } from "./types/GridItemsTp"
import B7logo from './assets/devmemory_logo.png'
import { formatTimeElapsed } from "./Helpers/formatTimeElapsed"

export const App = () => {
  const [gridItem, setGridItem] = useState<GridItemsTp[]>([])
  const [playing, setPlaying] = useState<boolean>(false)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  useEffect(() => { RestartAndCreateGridItem() }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if (moveCount > 0 && gridItem.every((item) => item.permanentShown === true)) {
      setPlaying(false)
    }
  }, [moveCount, gridItem])

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItem.filter((item) => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItem]
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].shown = false
              tmpGrid[i].permanentShown = true
            }

          }
          setGridItem(tmpGrid)
          setShownCount(0)
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItem]
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false
            }
            setGridItem(tmpGrid)
            setShownCount(0)

          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItem])


  const RestartAndCreateGridItem = () => {
    let tmpGrid: GridItemsTp[] = []

    // Adicionar os objetos (shown, permanentShown e item) ao Items ↓
    for (let i = 0; i < Items.length * 2; i++) {
      tmpGrid.push({ shown: false, permanentShown: false, item: null })
    }

    // Adicionar ao item um valor de 1 a 6, e esse valor se repetira duas vezes (ex: o numero 1 vai ter 2 dele, o numero 4 vao ter dois)

    for (let x = 0; x < 2; x++) {
      for (let i = 0; i < Items.length; i++) {
        let numAleatory = -1
        while (numAleatory < 0 || tmpGrid[numAleatory].item !== null) {
          numAleatory = Math.floor(Math.random() * (Items.length * 2))
        }
        tmpGrid[numAleatory].item = i;
      }
    }
    setGridItem(tmpGrid)
    setPlaying(true)
    setMoveCount(0)
    setShownCount(0)
    setTimeElapsed(0)
  }
  const clickGridItem = (index: number) => {
    if (shownCount < 2 && playing === true && index !== null) {
      let tmpGrid = [...gridItem]
      if (tmpGrid[index].shown === false && tmpGrid[index].permanentShown === false) {
        tmpGrid[index].shown = true
        setShownCount(shownCount + 1)
      }
      setGridItem(tmpGrid)
    }

  }
  return (
    <div className="Father">
      <div className="Centraliza">
        <div className="LeftSide">
          <div className="Logo-LS">
            <img className="w-full" src={B7logo} alt="" />
          </div>
          <div >
            <LeftSideInfo label="Tempo" value={formatTimeElapsed(timeElapsed)} />
            <LeftSideInfo label="Movimentos" value={moveCount} />
          </div>
          <button className="pt-6 flex text-[25px] text-[#abacb1]" onClick={RestartAndCreateGridItem}>Reiniciar</button>
        </div >
        <div className="RightSide">
          {gridItem.map((item, index) => (
            <GridItems data={item} key={index} onClickProp={() => clickGridItem(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App

