import {
    Link,
    useSearchParams,
    useLocation
} from 'react-router-dom'

export const Page_Preparing_Noticement = () => {

    const Current_Path = useLocation()
    const PathName_For_Notice_Client = Current_Path.pathname.slice(1)

    return <p id='Page_Preparing_Noticement'>

        <span> ' {PathName_For_Notice_Client} '
        <br></br>
         Page will be build soon</span>
        <br></br>
        <span>Click <Link to='..'>Here</Link> to get back</span>

    </p>
    
}

export default Page_Preparing_Noticement