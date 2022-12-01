import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Page = styled.ul`
    text-align:center;
`
const Span=styled.br`
    text-indent:5em;
`
const Pagenum = styled.li`
    color:black;
    display:inline-block;
    overflow:hidden;
    text-decoration:none;
`

const Click = styled.a`
    text-decoration:none;
    font-size:15px;
    border-radius: 50px 50px 50px 50px;
    background-color:#395B64;
    color:#395B64;
    padding-top:50px;
    padding-bottom:20px;
    padding-left:15px;
    padding-right:15px;

    &:focus{
        text-decoration:none;
        color:#395B64;
    }
`
const Pagination = ({totalPageCount,onChange})=>{
    const pageNumbers=[];

    for (let i=1; i<Math.ceil(totalPageCount)+1;i++){
        pageNumbers.push(i);
    }
    

    return(
        <nav>
            <Page className="pagination">
                {pageNumbers.map(num=>
                    <Pagenum key = {num}>
                        <Click onClick={()=> onChange(num)}>
                            <Link to={`./${num}`}>{num}</Link>
                        </Click>
                        <Span></Span>
                    </Pagenum>)}

            </Page>
        </nav>
    );
};

export default Pagination;