import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pagination from "../Pagination";

const Rank = styled.ul`
    display:flex;
    flex-direction:column;
    justify-content:center;
    list-style:none;
    align-items:space-between;
    align-content:center;
    margin-right:30px;
    width: 95%;/*vh: view hight - 보이는 부분의 100을*/
`

const Rank_content = styled.li`
    font-size:20px;
    margin-bottom:1px;
    padding-top:5px;
    padding-bottom:5px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    /*border*/
    border-style: solid;
    border-color:gray;
    border-top-width: 0px;
    border-bottom-width:2px;
    border-left-width:0px;
    border-right-width:0px;
`
const Rank_num = styled.b`
    font-size:25px;
    margin-right:20px;
`
const User_ = styled.span`
`


const UserName = styled.span`
    font-size:20px;
    margin-right:20px;
`
const UserStudyTime = styled.span`
    font-size:15px;
    float:right;
    margin-right:30px;
    align-items:center;
    background-color:beige;
`

export default function UserList(){
    const [userList, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const [page, setPage] = useState(1);
    const handlePageChange = (page)=>{setPage(page);};
    
    useEffect(() => {
      const fetchUsers = async (page) => {
        try {
          setError(null);
          setUsers(null);
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3001/timer/all-users/${page}`
          );
          console.log(response.data)
          setUsers(response.data);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };

  
      fetchUsers(page);
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!userList) return null;  


    return(
    <>
        <Rank className = "list_user">
            {userList.map((User)=>(
                <Rank_content key={User.Nickname}>
                    <User_>
                        <Rank_num>{userList.indexOf(User)+1}위</Rank_num>
                        <UserName>{User.Nickname}님</UserName>
                    </User_>
                    <UserStudyTime>-------{User.Time}분 달성 !</UserStudyTime>
                </Rank_content>
            ))}
            
        </Rank>

        <Pagination 
           totalPageCount={300}
           onChange = {handlePageChange}/>
    </>);
}

