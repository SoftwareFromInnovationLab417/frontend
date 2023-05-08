import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Manager, buildAccountUrl } from '@/data/account';
import { Resp } from '@/data/response';
import { AppContext } from '@/data/state';

export default function LoginForm() {
  const { state, setState } = useContext(AppContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var mainUrl: string = '/api/manager/login'

    let url = buildAccountUrl(mainUrl, username, password);

    const res = await fetch(url, {
      method: 'GET',
    });

    const data: Resp<string> = await res.json();
    if (data.success) {
      let token = data.data;
      // TODO: FOR TEST
      // let token = '73c3d744-c526-4d31-9ba6-5b70a344fb4c';
      let manager: Manager = {
        username,
        password,
        token,
      };

      setState({ data: manager });

      console.log('Manager Login in.');
      console.log(token);
      router.push('/manager')
    } else {
      setError(data.message);
    }
  }
  return (
    <form className="form-control w-full max-w-xs" onSubmit={handleSubmit}>
      <div>
        <label className="label">Account:</label>
        <input type="account" id="email" value={username} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <label className="label">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div>{error}</div>}
      <br />
      <button type="submit" className="btn btn-outline btn-warning">Login</button>
    </form>
  )
}