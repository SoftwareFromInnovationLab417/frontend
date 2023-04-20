import { Manager } from "@/data/account";
import { Resp } from "@/data/response";
import { UserAdd } from "@/data/responseData";
import { AppContext } from "@/data/state";
import React, { useContext, useEffect, useState } from "react";

export default function AddUser() {

  var constraints = { audio: false, video: { width: 300, height: 250 } };
  useEffect(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = document.querySelector('video')!;
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) { console.log(err.name + ": " + err.message); });
  }, [constraints])

  return (
    <>
      <video id='cam' />
      <AddForm />
      <canvas hidden={true} id="canvas" style={{ height: "10vh", width: "10vw" }}></canvas>
    </>
  )
}

export function AddForm() {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [video, setVideo] = useState('');
  const { state, setState } = useContext(AppContext);
  const token = (state.data as Manager).token;

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName === '') {
      setError('`Name` cannot be empty');
      return
    }
    if (number === '') {
      setError('`Number` cannot be empty');
      return
    }
    setError('');

    var video = document.getElementById('cam')! as HTMLVideoElement;
    let canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, 300, 300);
    let dataUrl = canvas.toDataURL('image/png');
    console.log(dataUrl)

    // send 

    // const sendUser: UserAdd = {
    //   file: dataUrl,
    //   username: userName,
    //   number,
    // }

    // const data = JSON.stringify(sendUser);

    // console.log(data);

    let url = '/api/manager/add';

    const formData = new FormData();
    formData.append('file', dataUrl);
    formData.append('username', userName);
    formData.append('number', number);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'token': token
      },
      body: formData
    })

    const result: Resp<{}> = await res.json();
    if (result.success) {
      console.log('Success');
      console.log(result);
    } else {
      console.log('Error');
    }
  }

  return (
    <form className="form-control" onSubmit={onsubmit}>
      <label className="input-group">
        <span>Name &nbsp;&nbsp;&nbsp;</span>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="input input-bordered" />
      </label>
      <br />
      <label className="input-group">
        <span>Number</span>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="input input-bordered" />
      </label>
      <br />
      <button type="submit" className="btn gap-2" >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        坐牢
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </button>
      <br />
      <div style={{ height: "1vh" }}>
        {error && <div className="alert alert-warning shadow-lg" style={{ height: "1vh" }} >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{error}</span>
          </div>
        </div>}
      </div>
    </form >
  )
}