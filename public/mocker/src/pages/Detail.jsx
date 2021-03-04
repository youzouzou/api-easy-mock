import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

const Wrapper = styled.div`
    display: flex;
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
        data: {
            "api": "/test",
            "name": "测试接口",
            "desc": "接口描述",
            "method": "get",
            "headers": {
                "token": "token值abcdefgxxxxxxxxxxxx"
            },
            "responseList": [
                {
                    "data": {
                        "page": 2
                    },
                    "response": {
                        "返回数据": "12312321"
                    }
                },
                {
                    "data": {
                        "page": 1
                    },
                    "response": {
                        "返回数据": "666666"
                    }
                }
            ],
            "defaultResponse": {}
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    handleChange = (value) => {
        console.log(value)
    }

    render() {
        return <Wrapper>
            <FormWrapper>
                <Form
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
                        name="path"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Input placeholder="/api" />
                    </Form.Item>

                    <Form.Item
                        label="请求方法"
                        name="method"
                        initialValue="GET"
                        required
                    >
                        <Select defaultValue="GET" onChange={this.handleChange}>
                            <Option value="GET">GET</Option>
                            <Option value="POST">POST</Option>
                            <Option value="PUT">PUT</Option>
                            <Option value="DELETE">DELETE</Option>
                        </Select>
                    </Form.Item>

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

export default Detail;