import Keywordbar from "../../components/Board/Keywordbar";
import BoardTable from "../../components/Board/BoardTable";
import KeywordBoardTable from "../../components/Board/KeywordBoardTable";
import{useParams} from "react-router-dom";

export default function KeyContent(){
    let {keyword}=useParams()
    
    return(
        <>
        <Keywordbar/>
        <KeywordBoardTable/>
        </>
    )
}