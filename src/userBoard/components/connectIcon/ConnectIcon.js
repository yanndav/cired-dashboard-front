import './ConnectIcon.css'

import { FaUserCircle } from 'react-icons/fa'
import { useHistory } from 'react-router'

const ConnectIcon = () => {
    const history = useHistory()
    return (
        // <div>
            <FaUserCircle 
        className="con-icon"
        size={20}
        onClick={() => history.push('/user-board')}
        />
        // </div>
    )
}

export default ConnectIcon
