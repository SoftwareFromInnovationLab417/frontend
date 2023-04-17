import dynamic from 'next/dynamic'
import { useEffect } from 'react';
export default function Home() {
  var constraints = { audio: false, video: { width: 300, height: 300 } };
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

  var onclick = () => {
    var video = document.getElementById('cam')! as HTMLVideoElement;
    let canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, 300, 300);
    let dataUrl = canvas.toDataURL('image/png');
    console.log(dataUrl)

    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = dataUrl;
    link.click();
  }

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content text-center">
        <div className="artboard">
          <video id='cam' />
          <br />
          <button className="btn btn-outline btn-warning" onClick={onclick}>打卡</button>
          <canvas hidden={true} id="canvas" style={{ height: "10vh", width: "10vw" }}></canvas>
        </div>
      </div>
    </div >
  )
}