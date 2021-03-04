import React from 'react';
import { List, Avatar, Button, Input } from 'antd';
import request from './../util/fetch';
import styled from 'styled-components';
import { postIcon, getIcon, putIcon, description, deleteIcon } from './../util/icon'
const { Search } = Input;

const Wrapper = styled.div`
    max-width:800px;
    margin: 0 auto;
    padding:20px;
    .operation-btn{
        font-size:12px;
        color: #1890ff;
    }
    .search{
        width:50%;
        margin:20px 0;
    }
`;

class Home extends React.Component {
    state = {
        data: [],
        list: []
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
        if (!value) {
            this.setState({
                data: [...this.state.list]
            })
        } else {
            this.setState({
                data: [...this.state.list].filter(item =>
                    item.api.indexOf(value) > -1 || item.desc.indexOf(value) > -1 || item.name.indexOf(value) > -1
                )
            })
        }
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


    render() {
        return <Wrapper>
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
                            title={item.name}
                            description={<div><div>{item.api}</div><div>{item.desc}</div></div>}
                        />
                    </List.Item>
                )}
            />
        </Wrapper>
    }
}

export default Home;