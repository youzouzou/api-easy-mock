import React from 'react';
import { List, Avatar, Button, Input, Select } from 'antd';
import request from './../util/fetch';
import styled from 'styled-components';
import { postIcon, getIcon, putIcon, description, deleteIcon } from './../util/icon'
const { Search } = Input;
const { Option } = Select;

const Wrapper = styled.div`
    max-width:800px;
    margin: 0 auto;
    padding:20px;
    .operation-btn{
        font-size:12px;
        color: #1890ff;
    }
    .select{
        margin:20px;
    }
    .search{
        width:50%;
        margin:20px 0;
    }
    .method-label{
        width:50px;
        display: inline-block;
        background: #00CC66;
        opacity:0.5;
        color:#fff;
        border-radius:15px;
        text-align: center;
        margin-right:10px;
    }
`;

class Home extends React.Component {
    state = {
        data: [],
        list: [],
        type: "",
        keyword: ""
    }
    componentDidMount() {
        const _this = this;
        request({
            url: '/getAllApi',
            method: 'get',
        }).then(function (res) {
            console.log(res, typeof res)
            if (res && res.length > 0) {
                _this.setState({
                    data: res,
                    list: [...res]
                })
            }
        })
    }

    onSearch = (value) => {
        console.log(value)
        this.setState({
            keyword: value
        })
        this.filter();
    }

    filter = () => {
        setTimeout(() => {
            const keyword = this.state.keyword || "";
            const method = this.state.method || "";
            this.setState({
                data: [...this.state.list].filter(item =>
                    (keyword ? (item.api.indexOf(keyword) > -1 || item.desc.indexOf(keyword) > -1 || item.name.indexOf(keyword) > -1) : true) && (method ? item.method.toUpperCase() == method : true)
                )
            })
        })
    }

    getIcon = (method) => {
        const upperMethod = method.toUpperCase()
        switch (upperMethod) {
            case "POST":
                return postIcon;
            case "PUT":
                return putIcon;
            case "DELETE":
                return deleteIcon;
            case "GET":
                return getIcon;
        }
    }

    handleChange = (value) => {
        this.setState(function (state, props) {
            return {
                method: value
            };
        }
        )
        this.filter();
    }


    render() {
        return <Wrapper>
            <Select className="select" defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="">所有类型</Option>
                <Option value="GET">GET请求</Option>
                <Option value="POST">POST请求</Option>
                <Option value="PUT">PUT请求</Option>
                <Option value="DELETE">DELETE请求</Option>
            </Select>
            <Search className="search" placeholder="api/名称/描述" onSearch={this.onSearch} enterButton />

            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button className="operation-btn" type="text" block>详情</Button>,
                            <Button className="operation-btn" type="text" block>修改</Button>,
                            <Button className="operation-btn" type="text" block>删除</Button>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={this.getIcon(item.method)} />}
                            title={<div><span className="method-label">{item.method}</span>{item.name}</div>}
                            description={<div><div>{item.api}</div><div>{item.desc}</div></div>}
                        />
                    </List.Item>
                )}
            />
        </Wrapper>
    }
}

export default Home;