import { SetStateAction } from "react";

interface MenuProps {
  selectNum: number;
  menu: string[];
  setSelectNum: React.Dispatch<SetStateAction<number>>
}

export default function Menu({ selectNum, menu, setSelectNum }: MenuProps) {
  const onclick = (index: number) => {
    setSelectNum(index);
  }
  const menuShow = menu.map((m, index) => {
    if (index === selectNum) {
      return <li key={index}><a className="active" onClick={() => onclick(index)}>{m}</a></li>;
    } else {
      return <li key={index}><a onClick={() => onclick(index)}>{m}</a></li>;
    }
  }
  );
  return (
    <>
      <ul className="menu bg-base-100 w-56">
        {menuShow}
      </ul>
    </>
  )
}
