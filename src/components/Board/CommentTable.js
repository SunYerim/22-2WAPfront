import styled from 'styled-components';
import apiClient from "../../libs/api/apiClient";
import { useState, useEffect } from "react";
import UserAPI from '../../libs/api/user';
import Pagination from "../NewPagination";
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';

const Body = styled.body`
background-color:#2C3333;
`
const ContentList = styled.ul`
`
const Header = styled.ul`
    border-radius: 20px 20px 20px 20px;
    color:#E7F6F2;
    background-color:#395B64;
    font-size:15px;
    
    padding-top:5px;
    padding-bottom:5px;
    padding-left:10px;

    display:grid;
    grid-template-columns: 8% 17% 16% 16.5% 11% 11%;

    flex-direction:row;
    justify-content:space-between;
    /*align-items:center;*/


    /*border*/
    border-style: solid;
    border-color:gray;
    border-top-width: 0px;
    border-bottom-width:0px;
    border-left-width:0px;
    border-right-width:0px;
    
`
const Keywords = styled.ul`
    display:flex;
    flex-direction:column;
    justify-content:center;
    list-style:none;
    align-items:space-between;
    align-content:center;
    width: 100%;/*vh: view hight - 보이는 부분의 100을*/
    padding-left:0px;
    

    /*border*/
    border-style: solid;
    border-color:gray;
    border-top-width: 2px;
    border-bottom-width:2px;
    border-left-width:2px;
    border-right-width:2px;

    border-radius: 20px 20px 0px 0px;
`

const Content = styled.li`
    font-size:20px;
    margin-bottom:1px;
    padding-top:5px;
    padding-bottom:5px;
    padding-left:20px;

    display:grid;
    grid-template-columns: 5% 50% 20%;


    flex-direction:row;
    justify-content:space-between;
    align-items:center;


    /*border*/
    border-style: solid;
    border-color: gray;
    border-top-width: 0px;
    border-bottom-width:2px;
    border-left-width:0px;
    border-right-width:0px;
    
`
const Num = styled.b`
    font-size:10px;
`
const Topic = styled.span`
`
const Category = styled.span`
`
const Writer = styled.span`
`
const Like = styled.b`
`
const Date = styled.b`
`


export default function CommentTable(props){
    let{reply_page}=useParams();

    const [contentList, setContentList] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const [page, setPage] = useState(1);
    const handlePageChange = (page)=>{setPage(page);};

    useEffect(()=>{
        setContentList(props.commentcontents);
    },[]);
    

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!contentList) return null;  


    return(
        <Body>
            <Header>댓글 목록</Header>
            <Keywords className = "keylist">
                {contentList.map((Post)=>(
                    <Content key={Post.id}>
                            <Num>{Post.member}</Num>
                            <Topic>
                                {Post.content}
                            </Topic>
                            <Date>{Post.dateTime.substr(0,10)}</Date>
                    </Content>
                ))}
            </Keywords>
            <Pagination 
                totalPageCount={10}
                onChange = {handlePageChange}/>
        </Body>
    );

}
