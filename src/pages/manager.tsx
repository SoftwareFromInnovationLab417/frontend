import AddUser from "@/components/addUser";
import Menu from "@/components/menu";
import ShowUser from "@/components/showUser";
import { useState } from "react";

export default function Manager() {
  const [readSelectNum, setSelectNum] = useState(0);
  const menu = ['ShowUser', 'AddUser'];
  const pages = [ShowUser, AddUser]
  const Page = pages[readSelectNum];
  return (
    <>
      <div className="flex flex-col w-full lg:flex-row" style={{ width: "95vw", height: "70vh" }}>
        <div className="grid card bg-base-300 rounded-box" style={{ width: "15vw" }} >
          <Menu selectNum={readSelectNum} menu={menu} setSelectNum={setSelectNum} />
        </div>
        <div className="divider lg:divider-horizontal" />
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
          <Page />
        </div>
      </div>
    </>
  )
}