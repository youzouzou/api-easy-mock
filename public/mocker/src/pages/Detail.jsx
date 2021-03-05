import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import request from './../util/fetch';
const { Option } = Select;
const { TextArea } = Input;

const Wrapper = styled.div`
    display: flex;
    .input-wrapper{
        display:flex;
    }
    .add-icon{
        text-align:right;
        cursor: pointer;
    }
    .errmsg{
        margin-left:5px;
        color:red;
        font-size:10px;
    }
    .delete-icon{
        margin:3px 0 0 3px;
        color:#bbb;
    }
`;
const FormWrapper = styled.div`
    flex-grow:1;
    width:46%;
    padding:15px 2%;
    .cancel-btn{
        margin-right:20px;
    }
`;
const JSONWrapper = styled.div`
    flex-grow:1;
    width:50%;
`;

class Detail extends React.Component {

    state = {
        jsonOptions: {
            theme: "monokai",
            displayDataTypes: false,
            collapseStringsAfterLength: 20,
            /* onEdit: (edit) => {
                console.log('编辑', edit);
            } */
        },
        errmsgList: [],
        data:
        {
            "api": "/test",
            "name": "测试接口",
            "desc": "这里可以描述接口的约定",
            "method": "GET",
            "headers": {
            },
            "responseList": [
                {
                    "params": [
                        {
                            "key": "page",
                            "value": "1",
                        },
                        {
                            "key": "user",
                            "value": "张三"
                        }
                    ],
                    "response": "请求成功",
                }
            ],
            "defaultResponse": "默认返回值"
        }
        //  {
        //     "api": "",
        //     "name": "",
        //     "desc": "",
        //     "method": "GET",
        //     "headers": {
        //     },
        //     "responseList": [
        //         {
        //             "params": [
        //                 {
        //                     "key": "",
        //                     "value": "",
        //                 }
        //             ],
        //             "response": "",
        //         }
        //     ],
        //     "defaultResponse": ""
        // }


    }

    addParam = (index) => () => {
        console.log(index)
        const data = this.state.data;
        data.responseList[index].params.push({
            key: "",
            value: ""
        })
        this.setState({
            data
        })
    }

    changeParamKey = (e) => {
        console.log(e.target.value)

    }

    onFinish = (values) => {
        const { history } = this.props;
        request({
            url: '/addApi',
            method: 'post',
            data: this.state.data
        }).then(function (res) {
            if (res.code == 200) {
                message.success('已添加');
                history.push("/home")
            } else {
                message.error(res.msg);
            }

        })
    };

    handleChange = (value) => {
        const data = this.state.data;
        data.method = value
        this.setState({
            data
        })
    }

    saveApi = (e) => {
        const data = this.state.data;
        data.api = e.target.value;
        this.setState({ data })
    }

    validateJSON = async (e, value) => {
        if (value && !this.isJSON(value)) {
            return Promise.reject(new Error('JSON格式错误'));
        }
    }

    validateResJSON = (e, index) => {
        // const errmsgList = this.state.errmsgList;
        // if (e.target.value && !this.isJSON(e.target.value)) {
        //     errmsgList[index] = "JSON格式错误"
        // } else {
        //     errmsgList[index] = "";
        // }
        // this.setState({ errmsgList })

        const data = this.state.data;
        data.responseList[index].response = e.target.value;
        this.setState({
            data
        })

    }

    isJSON = (str) => {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                console.log('error：' + str + '!!!' + e);
                return false;
            }
        }
        return false;
    }

    addResponse = () => {
        const data = this.state.data;
        data.responseList.push({
            "params": [
                {
                    "key": "",
                    "value": ""
                }
            ],
            "response": ""
        })
        const errmsgList = this.state.errmsgList;
        errmsgList.push("");
        this.setState({
            data,
            errmsgList
        })
    }

    saveParamKey = (e, item) => {
        item.key = e.target.value;
    }

    saveParamValue = (e, item) => {
        item.value = e.target.value;
    }

    deleteParam = (list, index) => {
        list.splice(index, 1)
        this.setState({})
    }

    render() {
        return <Wrapper>
            <FormWrapper>
                <Form initialValues={this.state.data}
                    name="basic"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="接口名称"
                        name="name"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="接口路径"
                        name="api"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Input placeholder="/api" onChange={this.saveApi} />
                    </Form.Item>

                    <Form.Item
                        label="请求方法"
                        name="method"
                        required
                    >
                        <Select onChange={this.handleChange}>
                            <Option value="GET">GET</Option>
                            <Option value="POST">POST</Option>
                            <Option value="PUT">PUT</Option>
                            <Option value="DELETE">DELETE</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="默认返回结果"
                        name="defaultResponse"
                    // rules={[{
                    //     validator: this.validateJSON,
                    // }]}
                    >
                        <TextArea
                            placeholder="默认返回值"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>
                    {
                        this.state.data.responseList.map((res, index) =>
                            <Card key={index} title={"组合" + (index + 1)}>
                                <div>
                                    参数值
                                </div>
                                {
                                    res.params.map((item, _index) =>
                                        <div className="input-wrapper" key={_index}>
                                            <Input onChange={(e) => { this.saveParamKey(e, item) }} defaultValue={item.key} style={{ width: "150px" }} placeholder="参数名称" />
                                            <Input onChange={(e) => { this.saveParamValue(e, item) }} defaultValue={item.value} placeholder="参数值" />
                                            <span className="delete-icon">
                                                <MinusCircleOutlined onClick={() => { this.deleteParam(res.params, _index) }} />
                                            </span>
                                        </div>
                                    )
                                }
                                <div className="add-icon" onClick={this.addParam(index)}><Button block><PlusOutlined />添加请求参数</Button>
                                </div>
                                <br />
                                <div>
                                    返回值
                                    <span className="errmsg">{this.state.errmsgList[index]}</span>
                                    <TextArea
                                        defaultValue={res.response}
                                        // placeholder="JSON格式的返回值"
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                        onChange={(e) => { this.validateResJSON(e, index) }}
                                    />
                                </div>
                            </Card>
                        )
                    }

                    <div onClick={this.addResponse}>
                        <Button block><PlusOutlined />添加组合</Button>
                    </div>
                    <br />
                    <Form.Item>
                        <Button className="cancel-btn">
                            返回
                        </Button>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </FormWrapper>
            <JSONWrapper>
                <ReactJson {...this.state.jsonOptions} src={this.state.data} />
            </JSONWrapper>
        </Wrapper>
    }
}

export default withRouter(Detail);