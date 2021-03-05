import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { Form, Input, Button, Select, Card, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
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
            "api": "",
            "name": "",
            "desc": "",
            "method": "GET",
            "headers": {
            },
            "responseList": [
                {
                    "params": {
                        "": ""
                    },
                    "response": ""
                }
            ],
            "defaultResponse": ""
        }
    }

    addParam = (index) => () => {
        console.log(index)
        const data = this.state.data;
        const len = Object.keys(data.responseList[index].params).length;
        data.responseList[index].params["key" + (len + 1)] = ""
        this.setState({
            data: data
        })
    }

    changeParamKey = (e) => {
        console.log(e.target.value)

    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    handleChange = (value) => {
        console.log(value)
    }

    validateJSON = async (e, value) => {
        if (value && !this.isJSON(value)) {
            return Promise.reject(new Error('JSON格式错误'));
        }
    }

    validateResJSON = (e) => {
        console.log(e.target.value)
        console.log(this.isJSON(e.target.value))
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
            "params": {
            },
            "response": ""
        })
        this.setState({
            data: data
        })
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
                        name="path"
                        rules={[{ required: true, message: '必填项' }]}
                    >
                        <Input placeholder="/api" />
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
                        rules={[{
                            validator: this.validateJSON,
                        }]}
                    >
                        <TextArea
                            placeholder="JSON格式的默认返回值"
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
                                    Object.keys(res.params).map((paramkey, _index) =>
                                        <div className="input-wrapper" key={_index}>
                                            <Input defaultValue={paramkey} style={{ width: "150px" }} placeholder="参数名称" />
                                            <Input defaultValue={Object.values(res.params[paramkey])} placeholder="参数值" />
                                        </div>
                                    )
                                }
                                <div className="add-icon" onClick={this.addParam(index)}><Button block><PlusOutlined />添加请求参数</Button>
                                </div>
                                <br />
                                <div>
                                    返回值
                                        <TextArea
                                        placeholder="JSON格式的返回值"
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                        onChange={this.validateResJSON}
                                    />
                                </div>
                            </Card>
                        )
                    }

                    <div onClick={this.addResponse}>
                        <Button block><PlusOutlined />添加组合</Button>
                    </div>

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