/* eslint-disable react-hooks/exhaustive-deps */
import { Resp } from '@/data/response';
import { UserCheck } from '@/data/responseData';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
export default function CheckUser() {
  const checkUserLogin = Cookies.get('checkUserLogin');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<UserCheck | null>(null);
  const [retry, setRetry] = useState(0);
  const [showName, setShowName] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [isDK, setIsDK] = useState(false)

  var constraints = { audio: false, video: { width: 300, height: 300 } };

  const fetchData = async () => {
    if (checkUserLogin !== null) {
      console.log(checkUserLogin);

      const mainUrl = '/api/user/state';
      const url = mainUrl + '?cookies=' + checkUserLogin;
      const res = await fetch(url, {
        method: 'GET',
      });

      const result: Resp<{ name: string, state: string }> = await res.json();
      console.log(result);

      if (result.success) {
        setShowName(result.data.name + ' , 你的状态: ' + result.data.state);
        setIsDK(result.data.state === '签到中');
      } else {
        setShowName('同学')
      }
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [])

  var onclick = async () => {
    var video = document.getElementById('cam')! as HTMLVideoElement;
    let canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, 300, 300);
    let dataUrl = canvas.toDataURL('image/png');
    // console.log(dataUrl)

    // const link = document.createElement('a');
    // link.download = 'image.png';
    // link.href = dataUrl;
    // link.click();

    // console.log(dataUrl)

    const url = '/api/user/daka'
    const fromData = new FormData();
    fromData.append('file', dataUrl);

    const res = await fetch(url, {
      method: 'POST',
      body: fromData
    });

    const result: Resp<UserCheck> = await res.json();


    if (result.success) {
      console.log('success');
      console.log(result);
      setUser(result.data);
      setShowName(result.data.name);
      setShowTips(false);
      setRetry(0);
      document.getElementById('toggle')?.click();
      setMessage('Hello ' + result.data.name)
      // showBox(true);
    } else {
      console.log('failed');
      console.log(result);
      setRetry(1);
      setShowTips(true);
      document.getElementById('toggle')?.click();
      setMessage(result.message)
      // showBox(true);
    }
  }


  return (
    <>
      {
        showName &&
        <span> 你好 {showName}</span>
      }
      <div className="flex w-full">
        <div className="grid  flex-grow card rounded-box place-items-center">
          <div>
            <img src='big.png' style={{
              position: 'absolute',
              zIndex: 10,
              scale: '1.15',
            }} />
            <video id='cam' style={{ zIndex: 11 }} />
          </div>
          <br />
          <button className="btn btn-outline btn-warning" onClick={onclick}>
            打卡
          </button >
          <canvas hidden={true} id="canvas" style={{ height: "10vh", width: "10vw" }}></canvas>

          <a id="toggle" href="#my-modal-2" />
          <div className="modal" id="my-modal-2">
            <div className="modal-box">
              <h3 className="font-bold text-lg">人脸识别结果</h3>
              <p className="py-4">{message}</p>
              {showTips &&
                <p className="py-4"> tips: 眼睛和嘴巴需要动一下,耳朵可以漏一点出来 </p>
              }
              <div className="modal-action">
                {retry === 0 &&
                  <>
                    <a href="#" className="btn" onClick={async () => {
                      let url = '/api/user/check';

                      const body = JSON.stringify(user);
                      const resp = await fetch(url, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body
                      })
                      const result: Resp<string> = await resp.json();

                      console.log(result);
                      if (result.success) {
                        setRetry(2);
                        document.getElementById('toggle')?.click();
                        Cookies.set('checkUserLogin', user!.userId, { expires: 1 });
                        if (!isDK) {
                          setMessage(result.data)
                          setIsDK(true);
                        } else {
                          setMessage(result.data)
                          setIsDK(false);
                        }
                      } else {
                        setRetry(1);
                        document.getElementById('toggle')?.click();
                        setMessage(result.message)
                      }
                    }}>
                      这系我!
                    </a>
                    <a href="#" className="btn" onClick={() => {
                    }}>
                      这不系我!
                    </a>
                  </>
                }
                {
                  retry === 1 &&
                  <a href="#" className="btn" onClick={() => {
                  }}>
                    请重试!
                  </a>
                }
                {
                  retry === 2 &&
                  <a href="#" className="btn" onClick={() => {
                  }}>
                    认证完毕
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal" />
        <div className="grid flex-grow card rounded-box place-items-center">

        </div>
      </div>
    </>
  )
}