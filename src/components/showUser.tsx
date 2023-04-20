import { Manager } from "@/data/account";
import { Resp } from "@/data/response";
import { SignState, UserShow } from "@/data/responseData";
import { AppContext } from "@/data/state";
import { useContext, useState } from "react";

export default function ShowUser() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const { state, setState } = useContext(AppContext);
  const [data, setData] = useState<UserShow[]>([]);
  let token = (state.data as Manager).token;

  const onclick = async () => {
    let url = '/api/manager/search';
    // let url = 'http://192.168.0.213:8089/user/search';

    // console.log(state.data);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'token': token
      }
    });

    const data: Resp<UserShow[]> = await res.json();

    if (data.success) {
      let showData = data.data;
      console.log(showData);
      if (showData.length == 0) {
        setData([]);
      } else {
        setData(showData);
      }
    } else {
    }
  }

  return (
    <div>
      <div>
        <span style={{ fontSize: "x-large" }}>Search User</span>
        <br />
        <input type="text" placeholder="Type here" value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered input-accent w-full max-w-xs" />
        <button className="btn btn-outline btn-info" onClick={onclick}>Search</button>
      </div>
      <br />
      <Table data={data} />

      {error && <div>{error}</div>}
    </div>
  )
}

interface TableProp {
  data: UserShow[]
}

export function Table({ data }: TableProp) {
  const dataShow = data.map((m, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{m.name}</td>
        <td>{m.userId}</td>
        <td>{m.signInTime}</td>
        <td>{m.signOutTime}</td>
        <td>{m.day}</td>
        <td>{SignState[m.state]}</td>
      </tr>
    )
  });
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head*/}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Sing In Time</th>
            <th>Sing Out Time</th>
            <th>Day</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataShow}
        </tbody>
      </table>
    </div>
  )

}