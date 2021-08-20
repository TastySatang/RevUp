import { useHistory } from 'react-router-dom'
import './splash.css'

export default function Splash() {
    const history = useHistory();

    const handleSignup = () => {
        history.push('/sign-up')
    }
    return (
        <div className='splash__main--div'>
            <div className='splash__content--div'>
                <h2>For Car lovers Everywhere, </h2>
                <h2>Meet up Anywhere!</h2>
                <div className='splash__signupBtn--div'>
                    <button type='button' className='splash__signup--btn' onClick={handleSignup}>Sign-up Now!</button>
                </div>
            </div>
        </div>
    )
}
