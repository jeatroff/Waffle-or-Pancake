import { useHistory } from 'react-router-dom'

function Home({ user }) {
    const history = useHistory();
    if(user == null) {
        history.push("/login")
    }

    return (
        <div>
            <h1>Welcome to Waffle or Pancake!</h1>
        </div>
    );
}

export default Home;