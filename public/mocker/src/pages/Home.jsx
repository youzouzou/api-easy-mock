import React from 'react';
import { List, Avatar, Button, Input, Select, Popconfirm, message } from 'antd';
import request from './../util/fetch';
import styled from 'styled-components';
import { postIcon, getIcon, putIcon, deleteIcon } from './../util/icon'
import { withRouter } from "react-router-dom";
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
    .add-btn{
        float:right;
        margin:20px 0;
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
        this.getList();
    }


    getList = () => {
        const _this = this;
        request({
            url: '/getAllApi',
            method: 'get',
        }).then(function (res) {
            console.log(res, typeof res)
            if (res && res.length > 0) {
                _this.setState({
                    list: [...res]
                })
                _this.filter();
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
                    (keyword ? (item.api.indexOf(keyword) > -1 || item.desc.indexOf(keyword) > -1 || item.name.indexOf(keyword) > -1) : true) && (method ? item.method.toUpperCase() === method : true)
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
            default:
                return postIcon;
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

    deleteApi = (item) => () => {
        const _this = this;
        request({
            url: '/deleteApi?api=' + item.api.slice(1),
            method: 'delete',
        }).then(function (res) {
            message.success('已删除');
            _this.getList();
        })
    }

    goToDetail = (item, type) => () => {
        console.log(type)
        const { history } = this.props;
        history.push({
            pathname: "/detail",
            params: {
                type: type,
                data: item
            }
        })
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
            <Button onClick={this.goToDetail(null, "add")} type="primary" className="add-btn">新增</Button>
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button onClick={this.goToDetail(item, "read")} className="operation-btn" type="text" block>详情</Button>,
                            <Button onClick={this.goToDetail(item, "edit")} className="operation-btn" type="text" block>修改</Button>,
                            <Popconfirm
                                title="确定删除？"
                                onConfirm={this.deleteApi(item)}
                                okText="删除"
                                cancelText="取消"
                            ><Button className="operation-btn" type="text" block>删除</Button></Popconfirm>]}>
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

export default withRouter(Home);